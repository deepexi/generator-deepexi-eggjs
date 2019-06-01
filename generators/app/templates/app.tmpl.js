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

module.exports = app => {
  app.beforeStart(async () => {
  });
};
