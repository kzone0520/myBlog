'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class UserController extends Controller {
	// 注册
	async register() {
		const ctx = this.ctx
		let param = ctx.request.body || {}
		let cap = ctx.cookies.get('cap', {
			encrypt: true, // 对被加密的 Cookies 进行解密
			httpOnly: false
		});
		param.cap = cap
		let res = await ctx.service.user.register(param)
		ctx.body = res
	}
	// 验证码
	async verify() {
		const ctx = this.ctx
		var r = parseInt(Math.random() * 255)
		var g = parseInt(Math.random() * 255)
		var b = parseInt(Math.random() * 255)
		const cap = svgCaptcha.create({
			size: 4, // 验证码长度
			ignoreChars: '0o1i', // 验证码字符中排除 0o1i
			noise: 1, // 干扰线条的数量
			color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
			background: `rgb(${r},${g},${b})`, // 验证码图片背景颜色
		});
		ctx.cookies.set('cap', cap.text, {
			maxAge: 1000 * 3600 * 24, // cookies 有效期：一天
			httpOnly: false,
			signed: true, // 对 Cookies 进行签名，防止用户修改
			encrypt: true, // 对 Cookies 进行加密，同时获取时ye需要解密
		});
		ctx.response.type = 'image/svg+xml'; // 设置返回的类型
		ctx.body = cap.data
	}
	// 登录
	async login() {
		const ctx = this.ctx
		let param = ctx.request.body || {}
		let res = await ctx.service.user.login(param)
		ctx.body = res
	}
}

module.exports = UserController;