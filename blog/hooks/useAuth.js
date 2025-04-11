"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { _queryClient } from "@/context/QueryProvider";
import { ERouteTable } from "@/constants/route";
import API_CLIENT from "@/libs/api/client";
import { AuthRoutes } from "@/libs/api/routes/auth-routes";
import { useRouter } from "next/navigation";

export function useAuth(locale = "vi") {
  const { setUser, signOut, setToken, token } = useAuthStore();
  const router = useRouter();

  // ✅ Mutation for sign in
  const signInMutation = useMutation({
    mutationFn: async ({ identifier, password }) => {
      // Login and get token
      const response = await API_CLIENT.post(AuthRoutes.auth.signIn, {
        identifier,
        password,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      // ✅ Store user in Zustand
      setToken(data.jwt);

      // 🟡 Gọi profile API để lấy thông tin người dùng
      const profileRes = await API_CLIENT.get(AuthRoutes.auth.me);

      // 🟡 Lưu user
      setUser(profileRes.data);

      await _queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push(ERouteTable.HOME); // ✅ Redirect after login
    },
    onError: () => {
      alert("Invalid credentials");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ username, email, password }) => {
      const response = await API_CLIENT.post(AuthRoutes.auth.signUp, {
        username,
        email,
        password,
      });
      return response.data;
    },
    onSuccess: () => {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      router.push(`/${locale}/${ERouteTable.SIGIN_IN}`);
    },
    onError: (error) => {
      console.error("Đăng ký thất bại:", error);
      alert("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    },
  });

  // ✅ Fetch authenticated user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const profileRes = await API_CLIENT.get(AuthRoutes.auth.me);
        setUser(profileRes.data);
        return profileRes.data || null;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false,
  });

  // ✅ Mutation for logout
  const signOutMutation = useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: async () => {
      console.log("signOut");
      await _queryClient.invalidateQueries({ queryKey: ["user"] }); // ✅ Clear React Query cache
      signOut(); // ✅ Clear Zustand store
      router.push(`/${locale}/${ERouteTable.SIGIN_IN}`);
    },
  });

  return { signInMutation, signUpMutation, signOutMutation, userQuery };
}
