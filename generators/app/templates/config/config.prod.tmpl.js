'use strict';

module.exports = () => {
  return {
    logger: {
      level: 'INFO',
      consoleLevel: 'INFO'
    },
    requestLogger: {
      enable: false,
    };
    <%
    if (dependencies.swagger) {
      print(`
    swaggerdoc: {
      enable: false,  // 生产环境下禁用swagger
    },
    `);
      }
    %>
  };
};
