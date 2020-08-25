'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/register', controller.user.register);
  router.get('/verify', controller.user.verify);
  router.post('/login', controller.user.login);
  router.get('/addArticle', controller.article.addAtricle);
  router.get('/articles', controller.article.articles);
  router.get('/articleDetaile', controller.article.detail);
  router.post('/upload', controller.user.upload);
  router.get('/loginOut',controller.user.loginOut);
  router.get('/queryUserInfo',controller.user.queryUserInfo);
 // demo 
  router.get('/news', controller.demo.list);
};
