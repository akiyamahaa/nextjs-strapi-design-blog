"use client";
import { useAuthContext } from "@/context/AuthProvider";
import { useComment } from "@/hooks/useComment";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ERouteTable } from "@/constants/route";

const CommentForm = ({ blogId }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const [newComment, setNewComment] = useState("");
  const { postCommentMutation } = useComment(blogId);

  const sendComment = () => {
    if (isAuthenticated) {
      if (!newComment.trim()) return;

      postCommentMutation.mutate(
        { content: newComment },
        {
          onSuccess: () => {
            setNewComment("");
          },
        }
      );
    } else {
      router.push(`/vi/${ERouteTable.SIGIN_IN}`);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <textarea
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        ></textarea>

        <button
          onClick={sendComment}
          type="submit"
          disabled={postCommentMutation.isPending}
          className={`px-6 py-2 rounded font-semibold transition 
          ${
            postCommentMutation.isPending
              ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          }`}
        >
          {postCommentMutation.isPending ? "Đang gửi..." : "Gửi bình luận"}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
