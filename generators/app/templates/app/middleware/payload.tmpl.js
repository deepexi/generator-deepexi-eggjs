'use strict';

// see https://github.com/deepexi/deepexi-body for more information

const body = require('deepexi-body');

module.exports = (opt, app) => {
  return async function payload(ctx, next) {
    await next();
    if (ctx.status >= 200 && ctx.status < 300) {
      ctx.body = body.success(ctx.body || '', '操作成功');
    }
  };
};
