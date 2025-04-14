const isPublishedThisWeek = (publishedAt) => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
  endOfWeek.setHours(23, 59, 59, 999); // End of the day

  const publishedDate = new Date(publishedAt);
  return publishedDate >= startOfWeek && publishedDate <= endOfWeek;
};

const isLatestPost = (isoDate) => {
  if (!isoDate) return false;

  const postDate = new Date(isoDate);
  const now = new Date();

  const diffInMs = now.getTime() - postDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= 1;
};

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  try {
    return new Date(isoDate).toISOString().split("T")[0];
  } catch (error) {
    console.error("Invalid date:", isoDate);
    return "";
  }
};

const getDistributedDate = (publishedAt, id) => {
  const startDate = new Date(publishedAt); // Use the existing publishedAt date
  const daysOffset = id * 3; // Space out each post by 3 days (adjust as needed)
  startDate.setDate(startDate.getDate() - daysOffset);
  return startDate.toISOString();
};

export function convertBlogData(blog) {
  console.log(blog)
  const blogData = blog.attributes;
  console.log(blogData)

  return {
    id: blog.id,
    slug: blogData.slug,
    frontmatter: {
      published: blogData.publishedAt || false,
      title: blogData.title,
      description: blogData.description,
      image: blogData.thumbnail.data
        ? blogData.thumbnail.data.attributes.url
        : "/images/blog/post-01.jpg", // Default image if missing
      date: formatDate(blogData.createdAt),
      category: blogData.category.data.attributes.name,
      categorySlug: blogData.category.data.attributes.slug,
      // localizations: {
      //   locale: blogData.localizations.data[0].attributes.locale,
      //   slug: blogData.localizations.data[0].attributes.slug,
      // },
      author: blogData.author || "Admin",
      authorSlug: "admin",
      featured: blogData.featured || false,
      trending: blogData.trending || false,
      latest: isLatestPost(blogData.publishedAt),
      post_of_the_week: isPublishedThisWeek(blogData.publishedAt),
      authorImage: "/images/author/its-you.webp",
      readingTime: "10 phút để đọc",
    },
    content: blogData.content,
  };
}
