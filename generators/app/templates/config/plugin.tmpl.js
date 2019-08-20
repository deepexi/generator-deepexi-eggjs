'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },
  <%
    if(router === 'router-plus'){
      print(`
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
      `);
    }
    if(dependencies.utils){
      print(`
  utils: {
    enable: true,
    package: '@taccisum/egg-utils',
  },
      `);
    }
    if(dependencies.eureka){
      print(`
  eureka: {
    enable: true,
    package: '@taccisum/egg-eureka',
  },
      `);
    }
    if(dependencies.swagger){
      print(`
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
      `);
    }
    if(dependencies.tx){
      print(`
  tx: {
    enable: true,
    package: 'egg-tx',
  },
      `);
    }
    if(dependencies.jwt){
      print(`
  jwt: {
    enable: true,
    package: "@jackyhweng/egg-jwt"
  },
      `);
    }
    switch(db){
      case 'mongo':{
      print(`
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
      `)
        break;
      }
      case 'mysql': {
      print(`
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
      `)
        break;
      }
      default: {
        break;
      }
    }

    switch(configservice){
      case 'apollo':{
      print(`
  apollo: {
    enable: true,
    package: '@taccisum/egg-apollo',
  },
      `)
        break;
      }
      default: {
        break;
      }
    }
  %>

};
