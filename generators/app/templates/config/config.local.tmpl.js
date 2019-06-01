'use strict';

module.exports = () => {
  return {
    <%
    if(dependencies.eureka){
      print(`
    eureka: {
      enabled: true,
      client: {
        instance: {
          ipAddr: '127.0.0.1',
        },
        server: {
          registerWithEureka: false, // 本地开发时不注册到注册中心
          fetchRegistry: true,
        },
      },
    },
      `)
    }
    %>
  };
};
