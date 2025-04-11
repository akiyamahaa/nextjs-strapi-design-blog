"use client";
import { useComment } from "@/hooks/useComment";
import CommentItem from "./Comment";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";

const INITIAL_COMMENT_COUNT = 3;
const LOAD_MORE_STEP = 3;

const CommentGroup = ({ blogId }) => {
  const { commentsQuery } = useComment(blogId);
  const [listComment, setListComment] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COMMENT_COUNT);

  useEffect(() => {
    if (blogId) {
      commentsQuery.refetch();
    }
  }, [blogId]);

  useEffect(() => {
    if (commentsQuery.data) {
      const commentData = commentsQuery.data?.attributes?.comments?.data || [];
      setListComment(commentData);
    }
  }, [commentsQuery.data]);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  const visibleComments = listComment.slice(0, visibleCount);
  const hasMore = listComment.length > visibleCount;

  return (
    <div className="container">
      <div className="border-t pt-8 border-[#DBD8BD]">
        <section className="pb-16 sm:pb-24">
          <h2 className="text-base uppercase font-secondary pl-4 relative after:absolute after:rounded-full -mt-1 after:content-[''] after:h-2 after:w-2 after:bg-primary after:left-0 after:top-2">
            Bình luận bài viết
          </h2>

          <div className="space-y-6 mb-10">
            {commentsQuery.isLoading && <p>Đang tải bình luận...</p>}
            {commentsQuery.isError && <p>Không thể tải bình luận.</p>}
            {listComment.length === 0 && !commentsQuery.isLoading && (
              <p>Chưa có bình luận nào.</p>
            )}

            {/* Hiển thị danh sách comment giới hạn */}
            {visibleComments.map((comment) => {
              const { id, attributes } = comment;
              const { content, createdAt, user } = attributes;
              const username =
                user?.data?.attributes?.username?.trim() || "Ẩn danh";
              const formattedDate = new Date(createdAt).toLocaleString(
                "vi-VN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              );

              return (
                <CommentItem
                  key={id}
                  username={username}
                  createdAt={formattedDate}
                  content={content}
                />
              );
            })}

            {/* Nút xem thêm nếu còn comment chưa hiển thị */}
            {hasMore && (
              <div>
                <button
                  onClick={handleViewMore}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Xem thêm bình luận
                </button>
              </div>
            )}
          </div>

          <CommentForm blogId={blogId} refetch={commentsQuery.refetch} />
        </section>
      </div>
    </div>
  );
};

export default CommentGroup;
