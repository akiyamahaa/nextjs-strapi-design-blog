export function formatWithLocalization(category, allCategories) {
  const match = allCategories.find(
    (cat) => cat.attributes.name.toLowerCase() === category.name.toLowerCase()
  );

  if (!match || !match.attributes.localizations?.data?.length) {
    return category; // No match or no localization data
  }

  const localized = match.attributes.localizations.data[0].attributes;

  return {
    ...category,
    localization: {
      locale: localized.locale,
      slug: localized.slug,
    },
  };
}

export const fetchCategories = async (locale = "vi") => {
  try {
    let page = 1;
    let allData = [];
    let hasMore = true;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const endpoint = "/api/categories";

    // Build filter query string
    while (hasMore) {
      const query = [
        `locale=${locale}`,
        "populate=localizations",
        `pagination[page]=${page}`,
        "pagination[pageSize]=25",
      ].join("&");

      const url = `${baseUrl}${endpoint}?${query}`;

      const res = await fetch(`${url}`, { cache: "force-cache" });
      if (!res.ok) throw new Error("Failed to fetch categories");

      const { data, meta } = await res.json();
      allData = [...allData, ...data];

      if (page >= meta.pagination.pageCount) {
        hasMore = false;
      } else {
        page++;
      }
    }
    return allData;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
