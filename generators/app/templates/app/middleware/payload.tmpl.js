'use strict';

// see https://github.com/deepexi/deepexi-body for more information

module.exports = (opt, app) => {
  return async function payload (ctx, next) {
    await next();
    ctx.body = body.success(ctx.body || '', '操作成功');
  };
};
