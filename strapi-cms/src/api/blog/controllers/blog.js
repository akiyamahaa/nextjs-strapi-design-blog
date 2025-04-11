"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { title, content, description, category, thumbnail, period, region } =
      ctx.request.body.data || {};

    if (!user) {
      return ctx.unauthorized("Bạn cần đăng nhập để tạo bài viết");
    }

    // Tạo bài viết với status = 'pending' + author = user.id
    const blog = await strapi.entityService.create("api::blog.blog", {
      data: {
        title,
        content,
        description,
        category,
        period,
        region,
        status: "pending", // 👈 mặc định
        author: user.id,
      },
    });

    return { data: blog };
  },
}));
