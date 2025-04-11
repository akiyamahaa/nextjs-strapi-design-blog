"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import API_CLIENT from "@/libs/api/client";
import { CommentRoutes } from "@/libs/api/routes/comment-routes";

export function useComment(blogId) {
  // ✅ Get comments for a blog post
  const commentsQuery = useQuery({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      const response = await API_CLIENT.get(
        CommentRoutes.comment.getByBlog(blogId)
      );
      return response.data?.data || [];
    },
    enabled: false, // chỉ chạy nếu blogId có giá trị
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Post a new comment
  const postCommentMutation = useMutation({
    mutationFn: async ({ content }) => {
      const response = await API_CLIENT.post(CommentRoutes.comment.post, {
        data: {
          content,
          blog: blogId,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Sau khi comment thành công, refetch lại danh sách comment
      commentsQuery.refetch();
    },
    onError: (error) => {
      console.error("Đăng bình luận thất bại:", error);
      alert("Không thể gửi bình luận. Vui lòng thử lại.");
    },
  });

  return {
    commentsQuery,
    postCommentMutation,
  };
}
