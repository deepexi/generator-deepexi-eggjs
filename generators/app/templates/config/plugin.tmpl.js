'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  <%
    if(dependencies.eureka){
      print(`
  eureka: {
    enable: true,
    package: '@taccisum/egg-eureka',
  },
      `)
    }
  %>

};
