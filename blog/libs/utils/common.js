export const getLocalizedSlug = (post, targetLocale) => {
  if (post.locale === targetLocale) return post.slug;

  const found = post.localizations.find((loc) => loc.locale === targetLocale);

  return found?.slug || null;
};
