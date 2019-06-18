'use strict';

module.exports = (opt, app) => {
  return async function payload (ctx, next) {
    await next();
    ctx.body = body.success(ctx.body || '', '操作成功');
  };
};
