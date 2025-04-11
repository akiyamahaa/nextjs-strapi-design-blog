"use strict";

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("Bạn cần đăng nhập để bình luận");

    const { content, blog } = ctx.request.body.data;

    const comment = await strapi.entityService.create("api::comment.comment", {
      data: {
        content,
        blog,
        user: user.id,
        publishedAt: new Date(), // 👈 auto publish!
      },
    });

    return { data: comment };
  },
}));
