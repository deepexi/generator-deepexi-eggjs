'use strict';

const path = require('path');
const _ = require('lodash');

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

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    let overrideConfig;
    const fpath = path.join(process.cwd(), 'override.js');
    try {
      overrideConfig = require(fpath);
    } catch (e) {
      // 获取override配置失败不应该影响应用启动
      this.app.logger.warn('读取' + fpath + '失败，错误信息：' + e.message);
    }
    if (overrideConfig) {
      this.app.logger.debug('覆写的配置：' + JSON.stringify(overrideConfig));
      _.merge(this.app.config, overrideConfig);
    }
  }
};
