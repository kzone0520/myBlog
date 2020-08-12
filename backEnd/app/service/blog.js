'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
    async addTo() {
        const result = await this.app.mysql.insert('articles', {
			article_title: '标题测试111',
            article_content: `MySQL 事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你既需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等。这时候使用事务处理可以方便管理这一组操作。 一个事务将一组连续的数据库操作，放在一个单一的工作单元来执行。该组内的每个单独的操作是成功，事务才能成功。如果事务中的任何操作失败，则整个事务将失败。

            一般来说，事务是必须满足4个条件（ACID）： Atomicity（原子性）、Consistency（一致性）、Isolation（隔离性）、Durability（可靠性）
            
            原子性：确保事务内的所有操作都成功完成，否则事务将被中止在故障点，以前的操作将回滚到以前的状态。
            一致性：对于数据库的修改是一致的。
            隔离性：事务是彼此独立的，不互相影响
            持久性：确保提交事务后，事务产生的结果可以永久存在。
            因此，对于一个事务来讲，一定伴随着 beginTransaction、commit 或 rollback，分别代表事务的开始，成功和失败回滚。`,
            article_views: 1010,
            article_comment_count: 501,
            article_date: new Date(),
            article_zan: 60
        });
        // 判断插入成功
		if (result.affectedRows === 1) {
			return {
				error: 0,
				msg: '发表成功'
            }
		} else {
            return {
				error: 1,
				msg: '发表失败'
			}
        }
    }
    async getArticle() {
        let result = await this.app.mysql.select('articles')
        if (result && result.length > 0) {
            return {
				error: 0,
                msg: '检索成功',
                data: result
			}
        } else {
            return {
                error: 1,
                msg: '检索失败'
            }
        }
    }
    async getDetail(param) {
        let result = await this.app.mysql.select('articles', {
            where: {
                article_id: param
            }
        })
        if (result && result.length > 0) {
            return {
				error: 0,
                msg: '检索成功',
                data: result[0]
			}
        } else {
            return {
                error: 1,
                msg: '检索失败'
            }
        }
    }
}

module.exports = BlogService