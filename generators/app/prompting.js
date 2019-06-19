const regUtils = require('../util/reg_utils');

module.exports = [
  {
    type: 'input',
    name: 'orgName',
    message: '请输入你的组织名称（可空）',
    validate: (msg) => {
      if (!msg) {
        return true;
      }
      // TODO:: check org name
      // if (regUtils.isWord(msg)) {
      //   return true;
      // } else {
      //   return '组织名称只支持单个英文单词';
      // }
    }
  },
  {
    type: 'input',
    name: 'projectName',
    message: '请输入你的项目名称',
    default: 'deepexi-eggjs'
  },
  {
    type: 'input',
    name: 'author',
    message: '请输入你的名称',
    validate: (msg) => {
      if (msg) {
        if (regUtils.isEnglishName(msg)) {
          return true;
        } else {
          return '只支持英文名称';
        }
      } else {
        return '名称不能为空';
      }
    }
  },
  {
    type: 'list',
    choices: [
      'router-plus',
      'default'
    ],
    name: 'router',
    message: '请选择路由组件'
  },
  {
    type: 'list',
    choices: [
      'mongo',
      'mysql',
      'none'
    ],
    name: 'db',
    message: '请选择你使用的数据库'
  },
  {
    type: 'list',
    choices: [
      'apollo',
      'none'
    ],
    name: 'configservice',
    message: '请选择你的配置中心类型'
  }
];
