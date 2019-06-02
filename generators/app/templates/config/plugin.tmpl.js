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
    if(dependencies.eureka){
      print(`
  eureka: {
    enable: true,
    package: '@taccisum/egg-eureka',
  },
      `)
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
  %>

};
