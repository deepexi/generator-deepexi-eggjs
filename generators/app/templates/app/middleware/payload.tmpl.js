'use strict';

// 中间件只能用 Generator形式

module.exports = () => {
  return async function payload (ctx, next) {
    // ######## request phase ########

    await next();

    // ######## response phase ########

    // 正确情况统一消息体 payload
    ctx.body = {
      success: true,
      payload: ctx.body || ''
    };
  };
};
