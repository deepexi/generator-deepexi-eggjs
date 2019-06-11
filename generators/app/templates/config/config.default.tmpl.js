'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 应用需要的自定义配置写在这里
  const userConfig = {
    context: appInfo.name
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1559316688233_5201';

  config.bodyParser = {
    jsonLimit: '10mb'
  };

  // 配置需要的中间件，数组顺序即为中间件的加载顺序，这里的话gzip会去找 middleware/gzip.js
  config.middleware = [
    'requestId',
    'compress',
    'errorHandler',
    'notfoundHandler'
  ];

  config.compress = {
    threshold: 2048,
    enable: true
  };

  config.requestId = {
    expose: 'X-Request-Id',
    enable: true
  };

  config.security = {
    enable: false,
    // 一般防止请求伪造，登录成功生成 { _csrf: csrfToken }，把 _csrf 发给客户端，每次请求都带上才是当前用户操作
    // 如果伪造的就没有 _csrf，自然能防止掉；这边说一下这个功能可能和我们的 前后端分离的 access_token 有点重叠
    // 建议暂时关闭 T_T.
    csrf: {
      // 安全威胁CSRF设置： 忽略 JSON 请求
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      // 否则会要求带上 _csrf 参数
      ignoreJSON: true
    }
  };

  // 静态文件
  // https://github.com/eggjs/egg-static
  config.static = {
    prefix: '/', // 静态文件url
    dir: appInfo.baseDir + '/app/public/', // 静态资源的位置,默认地址为app/public
    maxAge: appInfo.env === 'prod' ? 365 * 24 * 60 * 60 : 0,
    // cacheControl: 'no-cache', // Overrides maxAge options.
    gzip: true
  };

  config.logrotator = {
    filesRotateBySize: [
      path.join(appInfo.root, 'logs', appInfo.name, appInfo.name + '-web.log')
    ],
    maxFileSize: 5 * 1024
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    outputJSON: true
  };

  <%
  if (dependencies.eureka) {
    print(`
  config.eureka = {
    enabled: process.env.ENABLE_EUREKA || false,
    client: {
      instance: {
        app: appInfo.name,
        // ipAddr: '127.0.0.1',
        // port: 7001,
        // vipAddress: 'deepexi.devops.vip',
        statusPageUrl: \`/\${userConfig.context}/info\`,
        homePageUrl: \`/\${userConfig.context}\`,
        healthPageUrl: \`/\${userConfig.context}/health\`,
      },
      server: {
        // host: '192.168.0.239',
        port: 8761,
      },
      // auth: {
        // user: 'admin',
        // password: 'deepexi',
      // },
    },
  };
    `)
  }

  if (dependencies.swagger) {
    print(`
  config.swaggerdoc = {
    enable: true,
    basePath: '/' + appInfo.name,
    dirScanner: './app/controller',
    apiInfo: {
      title: appInfo.name + ' Api Docs',
      description: 'your desc here.',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'token',
        in: 'header',
      },
    },
    enableSecurity: false,
    enableValidate: false,
    routerMap: false,
  };
    `);
  }

  switch (db) {
    case 'mongo': {
      print(`
  config.mongoose = {
    // url: \`mongodb://\${process.env.DB_HOST || '127.0.0.1:27017'}/your_db\`,
    options: {},
  };
      `);
      break;
    }
    case 'mysql':{
      print(`
  config.sequelize = {
    dialect: 'mysql',
    // database: 'your_db',
    // host: process.env.DB_HOST || '127.0.0.1',
    port: '3306',
    username: 'root',
    // password: 'your_password',
    pool: {
      max: 8,
      min: 0,
      idle: 10000,
    },
    timezone: '+08:00',
  };
      `)
      break;
    }
    default: {
      break;
    }
  }
  %>

  return {
    ...config,
    ...userConfig
  };
};
