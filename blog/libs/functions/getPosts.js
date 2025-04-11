import { convertBlogData } from "../utils/formatData";

export const fetchBlogs = async (locale = "vi", region, period) => {
  try {
    let page = 1;
    let allData = [];
    let hasMore = true;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const endpoint = "/api/blogs";

    // Build filter query string
    const filters = [];
    if (region) filters.push(`filters[region][$eq]=${region}`);
    if (period) filters.push(`filters[period][$eq]=${period}`);

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
    return convertedData;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
