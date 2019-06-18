'use strict';
const logger = require('koa-logger');
const _ = require('lodash');

module.exports = (options, app) => {
  return logger(_.merge({
    // transporter: (str, args) => {
    //   app.logger.debug(str);
    // },
  }, options));
};
