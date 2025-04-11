export const CommentRoutes = {
  comment: {
    getByBlog: (blogId) =>
      `/api/blogs/${blogId}?populate[category]=*&populate[comments][populate]=user`,
    post: "/api/comments",
  },
};
