'use strict';

// 鲁棒性
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', err => {
  console.error('Unexpected exception: %s', err);
  console.error('Unexpected exception stack: %s', err.stack);
  // Do something here:
  // Such as send a email to admin
  // process.exit(1)
});

// 根据model创表
module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    await app.model.sync(); // .sync({force: true}) => force: true will drop the table if it already exists
  });
};
