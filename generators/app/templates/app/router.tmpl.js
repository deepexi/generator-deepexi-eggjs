'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const APP_CONTEXT = app.config.context;

  const payload = app.middlewares.payload(); // 统一消息体

  router.get(`/<%= "${APP_CONTEXT}" %>/`, payload, controller.home.index);
};
