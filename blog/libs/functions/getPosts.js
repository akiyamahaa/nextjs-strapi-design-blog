import { convertBlogData } from "../utils/formatData";

export const fetchBlogs = async (locale = "vi") => {
  try {
    let page = 1;
    let allData = [];
    let hasMore = true;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const endpoint = "/api/blogs";

    // Build filter query string
    const filters = [];

    while (hasMore) {
      const query = [
        `locale=${locale}`,
        "populate=thumbnail",
        "populate=category",
        "populate=localizations",
        `pagination[page]=${page}`,
        "pagination[pageSize]=25",
        ...filters,
      ].join("&");

      const url = `${baseUrl}${endpoint}?${query}`;

      const res = await fetch(`${url}`, { cache: "force-cache" });
      if (!res.ok) throw new Error("Failed to fetch blogs");

      const { data, meta } = await res.json();
      allData = [...allData, ...data];

      if (page >= meta.pagination.pageCount) {
        hasMore = false;
      } else {
        page++;
      }
    }
    const convertedData = allData.map(convertBlogData);
    const sortedPosts = convertedData.sort((a, b) => {
      const dateA = new Date(
        a.frontmatter?.date || a.frontmatter?.published || 0
      );
      const dateB = new Date(
        b.frontmatter?.date || b.frontmatter?.published || 0
      );
      return dateB - dateA; // Sắp xếp giảm dần (mới nhất trước)
    });
    return sortedPosts;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
