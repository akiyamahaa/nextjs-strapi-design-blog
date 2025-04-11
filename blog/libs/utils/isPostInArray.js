export const isPostInArray = (post, array) =>
  array.some((item) => item.slug === post.slug);

export const getRandomPost = (posts) => {
  if (posts.length === 0) return null; // No post of the week available
  return posts[Math.floor(Math.random() * posts.length)]; // Randomly pick one
};
