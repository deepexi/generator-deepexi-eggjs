'use strict';

const path = require('path');
const onerror = require('deepexi-onerror');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 应用需要的自定义配置建议统一写在这里
  const userConfig = {
    context: appInfo.name
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1559316688233_5201';

  config.bodyParser = {
    jsonLimit: '10mb'
  };

  config.onerror = onerror();

  config.security = {
    enable: false,
    csrf: {
      ignoreJSON: true
    }
  };

  config.static = {
    prefix: '/',
    dir: appInfo.baseDir + '/app/public/',
    maxAge: appInfo.env === 'prod' ? 365 * 24 * 60 * 60 : 0,
    // cacheControl: 'no-cache', // Overrides maxAge options.
    gzip: true
  };

  config.middleware = [
    'requestId',
    'requestLogger',
    'compress',
  ];

  config.requestId = {
    expose: 'X-Request-Id',
    enable: true
  };

  config.requestLogger = {
    enable: true,
  };

  config.compress = {
    threshold: 2048,
    enable: true
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    outputJSON: true
  };

  config.logrotator = {
    filesRotateBySize: [
      path.join(appInfo.root, 'logs', appInfo.name, appInfo.name + '-web.log')
    ],
    maxFileSize: 5 * 1024
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
    basePath: '/' + userConfig.context,
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

  switch (configservice) {
    case 'apollo': {
      print(`
  config.apollo = {
    enabled: true,
    appId: appInfo.name,
    // host: 'http://127.0.0.1:8070',
  };
      `);
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
