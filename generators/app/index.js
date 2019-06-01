'use strict'
var Generator = require('yeoman-generator');

const path = require('path');
const fileUtils = require('../util/file_utils');
const TemplateHandlerFactory = require('./handler/factory');

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
        name: 'projectName',
        message: 'Your project name',
        default: 'deepexi-eggjs'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Your name'
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
