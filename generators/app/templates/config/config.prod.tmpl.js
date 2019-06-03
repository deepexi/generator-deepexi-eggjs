'use strict';

module.exports = () => {
  return {
    logger: {
      level: 'INFO',
      consoleLevel: 'INFO'
    },
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
