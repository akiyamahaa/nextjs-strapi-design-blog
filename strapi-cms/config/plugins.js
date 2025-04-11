module.exports = ({ env }) => ({
  i18n: {
    config: {
      enabled: true,
      locales: ["en", "vi"],
      defaultLocale: "vi",
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
    },
  },
});
