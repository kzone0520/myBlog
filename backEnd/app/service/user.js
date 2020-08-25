'use strict';

const Service = require('egg').Service;

class UserService extends Service {
	async register(param) {
        console.log("UserService -> register -> param", param)
		if (param.verify.toLowerCase() !== param.cap.toLowerCase()) {
			return {
				error: 1,
				msg: '验证码错误'
			}
		}
		if (!param.username.trim()) {
			return {
				error: 1,
				msg: '无效的用户名'
			}
		}
		if (!param.pass.trim() || param.pass.length < 6) {
			return {
				error: 1,
				msg: '密码必须长于6位'
			}
		}
		const checkName = await this.app.mysql.select('userinfo', {
			where: {
				username: param.username
			}, // WHERE 条件
		});
		if (checkName && checkName.length > 0) {
			return {
				error: 1,
				msg: '用户名已存在'
			}
		}
		const result = await this.app.mysql.insert('userinfo', {
			username: param.username,
			password: param.pass,
			create_time: new Date(),
			update_time: new Date()
		});
		// 判断插入成功
		if (result.affectedRows === 1) {
			return {
				error: 0,
				msg: '注册成功'
			}
		}
	};
	async login(param) {
		if (!param.username) {
			return {
				error: 1,
				msg: '请输入用户名'
			}
		}
		if (!param.password) {
			return {
				error: 1,
				msg: '请输入密码'
			}
		}
		const checkLogin = await this.app.mysql.select('userinfo', {
			where: {
				username: param.username
			}, // WHERE 条件
		});
		if ( checkLogin && checkLogin.length > 0 ) {
			if (checkLogin[0].password === param.password) {
				const checkLoginStatus = {
					login_status:1,
				}

				const options = {
					where: {
						user_id:checkLogin[0].user_id,
					}
				}
				const result = await this.app.mysql.update('userinfo',checkLoginStatus,options);
				return {
					error: 0,
					msg: '登录成功',
					data:checkLogin[0]
				} 
			} else {
				return {
					error: 1,
					msg: '密码错误'
				} 
			}
		} else {
			return {
				error: 1,
				msg: '用户名不存在'
			}
		}
	}

	async loginOut(param) {
		const checkLoginStatus = {
			login_status:0,
		}

		const options = {
			where: {
				user_id:param.user_id
			}
		}
		const result = await this.app.mysql.update('userInfo',checkLoginStatus,options)
		return {
			error: 0,
			msg: 'OK',
		} 
	}

	async queryUserInfo(param) {
		const userInfo = await this.app.mysql.select('userinfo', {
			where: {
				username: param.id
			}, 
		});
		return {
			error: 0,
			msg:'OK',
			data:userInfo
		}
	}

	async upload(file) {
		
	}
}
module.exports = UserService;