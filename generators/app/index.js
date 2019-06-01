'use strict'
var Generator = require('yeoman-generator');

const path = require('path');
const fileUtils = require('../util/file_utils');
const TemplateHandlerFactory = require('./handler/factory');
const regUtils = require('../util/reg_utils');

module.exports = class extends Generator {
  catch (e) {
    if (e) {
      console.log(e)
    }
  };

  async prompting () {
    const answers = await this.prompt([
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
      }
    ])
    this.props = answers
    this.props.dependencies = {
      eureka: true
    }
  }

  write () {
    const dir = path.join(__dirname, './templates')
    const files = fileUtils.readAllFileRecursivelySync(dir)

    files.forEach(f => {
      if (fileUtils.isTemplate(f)) {
        TemplateHandlerFactory.create(f, this, this.props).handle();
      }
    })
  }
}
