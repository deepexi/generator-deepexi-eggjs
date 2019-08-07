'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const homeRouter = router.namespace(`/<%= "${app.config.context}" %>`);

  homeRouter.get('/', controller.home.index);
};
