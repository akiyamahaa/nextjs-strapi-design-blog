"use strict";

/**
 * upvote controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::upvote.upvote", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { blog, value } = ctx.request.body.data;

    if (!user) {
      return ctx.unauthorized("Bạn cần đăng nhập để upvote");
    }

    if (![-1, 1].includes(value)) {
      return ctx.badRequest("Giá trị vote không hợp lệ (chỉ nhận 0 hoặc 1)");
    }

    if (!blog) {
      return ctx.badRequest("Thiếu thông tin bài viết");
    }

    // Kiểm tra user đã vote blog này chưa
    const existing = await strapi.db.query("api::upvote.upvote").findOne({
      where: {
        user: user.id,
        blog: blog,
      },
    });

    if (!existing) {
      // Tạo mới vote
      const created = await strapi.entityService.create("api::upvote.upvote", {
        data: {
          blog,
          user: user.id,
          value,
          publishedAt: new Date(),
        },
      });

      return { data: created };
    }

    // Đã tồn tại → cập nhật giá trị mới
    const updated = await strapi.entityService.update(
      "api::upvote.upvote",
      existing.id,
      {
        data: {
          value,
          publishedAt: new Date(),
        },
      }
    );

    return { data: updated };
  },
}));
