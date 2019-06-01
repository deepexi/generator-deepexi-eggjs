'use strict';

module.exports = () => {
  return async function notfoundHandler (ctx, next) {
    await next();

    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = {
          error: 'Not Found'
        };
      } else {
        ctx.body = '<h1>Page Not Found</h1>';
      }

      // ps:经过测试发现,若不重新赋值响应码，返回到前端的响应码一直是200
      ctx.status = 404;
    }
  };
};
