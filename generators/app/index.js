'use strict'

const path = require('path');
const Trigger = require('yo-power-generator').Trigger;
const regUtils = require('../util/reg_utils');

const obj = {
  orgName: {
    prompting: { type: 'input', message: '请输入你的组织名称（可空）', default: '' },
    option: { desc: '组织名称', type: String, default: '' }
  },
  projectName: {
    prompting: { type: 'input', message: '请输入你的项目名称', default: 'deepexi-eggjs' },
    option: { desc: '项目名称', type: String, default: 'deepexi-eggjs' }
  },
  author: {
    prompting: {
      type: 'input',
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
    option: { desc: '作者', type: String, default: '' }
  },
  router: {
    prompting: {
      type: 'list',
      message: '请选择路由组件',
      choices: [
        'router-plus',
        'default'
      ]
    },
    option: { desc: '路由组件', type: String, default: 'default' }
  },
  db: {
    prompting: {
      type: 'list',
      choices: [
        'mongo',
        'mysql',
        'none'
      ],
      message: '请选择你使用的数据库'
    },
    option: { desc: '数据库', type: String, default: 'none' }
  },
  configservice: {
    prompting: {
      type: 'list',
      choices: [
        'apollo',
        'none'
      ],
      message: '请选择你的配置中心类型'
    },
    option: { desc: '配置中心', type: String, default: 'none' }
  },
  apm: {
    prompting: {
      type: 'list',
      choices: [
        'skywalking',
        'none'
      ],
      message: '请选择你要接入的APM类型'
    },
    option: { desc: 'APM', type: String, default: 'none' },
    child: {
      swServers: {
        prompting: {
          type: 'input', message: 'Skywalking Servers地址（默认localhost:11800）'
        },
        option: { desc: 'Skywalking Servers地址', type: String, default: 'localhost:11800' },
        callbacks: {
          trigger: [
            new Trigger.AnyAnswerTrigger('apm', 'skywalking')
          ]
        }
      }
    }
  }
  // demo: {
  //   prompting: {
  //     type: 'confirm',
  //     message: '是否为你生成相关的demo文件（默认No）',
  //     default: false
  //   },
  //   option: { desc: '生成demo', type: Boolean, default: false }
  // }
}

module.exports = require('yo-power-generator').getGenerator(obj, {
  description: '该 Egg.js 脚手架为你提供了一个快速开发的环境',
  handlerDir: path.join(__dirname, 'handler'),
  templateDir: path.join(__dirname, 'templates'),
  afterPropsSet (props) {
    props.version = require('../../package.json').version
    props.cli = `yo generator-deepexi-eggjs -c ${props.cli}`;

    props.conditions = {};

    if (props.db !== 'none') {
      if (props.demo) {
        props.conditions.crud = true;
      }
    }

    if (props.router !== 'default') {
      props.conditions[props.router] = true;
    } else {
      props.conditions['default-router'] = true;
    }

    if (props.configservice !== 'none') {
      props.conditions[props.configservice] = true;
    }

    props.dependencies = {
      utils: true,
      eureka: true,
      swagger: true,
      tx: (props.db !== 'none')
    }
  }
});
