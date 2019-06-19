'use strict'
var Generator = require('yeoman-generator');

const path = require('path');
const fileUtils = require('../util/file_utils');
const TemplateHandlerFactory = require('./handler/factory');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);

    this.option('command', { desc: '使用命令模式（非交互操作）', alias: 'c', type: Boolean, default: false });

    this.option('orgName', { desc: '组织名称', type: String, default: '' });
    this.option('projectName', { desc: '项目名称', type: String, default: 'deepexi-eggjs' });
    this.option('author', { desc: '作者', type: String, default: 'taccisum' });
    this.option('router', { desc: '路由组件', type: String, default: 'default' });
    this.option('db', { desc: '数据库', type: String, default: 'none' });
    this.option('configservice', { desc: '配置中心', type: String, default: 'none' });
  }

  catch (e) {
    // if (e) {
    // console.log(e)
    // }
  };

  async prompting () {
    if (!this.options.command) {
      const answers = await this.prompt(require('./prompting'));
      this.props = answers
    } else {
      this.props = {
        orgName: this.options.orgName,
        projectName: this.options.projectName,
        author: this.options.author,
        db: this.options.db,
        configservice: this.options.configservice
      }
    }
    this.props.dependencies = {
      utils: true,
      eureka: true,
      swagger: true
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
