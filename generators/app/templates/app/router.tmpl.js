'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const APP_CONTEXT = app.config.context;

  router.get(`/<%= "${APP_CONTEXT}" %>/`, controller.home.index);
};
