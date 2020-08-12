'use strict';

const Controller = require('egg').Controller;

class articleController extends Controller {
    async addAtricle() {
        const { ctx } = this;
        let res = await ctx.service.blog.addTo()
        ctx.body = res
    }
    async articles() {
        const ctx = this.ctx
        let res = await ctx.service.blog.getArticle()
        ctx.body = res
    }
    async detail() {
        const ctx = this.ctx
        let param = ctx.request.query.article_id || ''
        let res = await ctx.service.blog.getDetail(param)
        ctx.body = res
    }
}
module.exports = articleController;