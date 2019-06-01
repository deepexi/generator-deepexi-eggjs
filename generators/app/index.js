'use strict'
var Generator = require('yeoman-generator')

const _ = require('lodash')
const path = require('path')
const fileUtils = require('../util/file_utils')

class AbstractTemplateHandler {
  constructor (tmpl, generator, props) {
    this.tmpl = tmpl;
    this.generator = generator;
    this.props = props;
  }
}

class DefaultTemplateHandler extends AbstractTemplateHandler {
  handle () {
    const readmeTpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)))
    this.generator.fs.write(this.generator.destinationPath(fileUtils.tmplToFileName(this.tmpl)), readmeTpl(this.props))
  }
}

class TemplateHandlerFactory {
  static create (tmpl, generator, props) {
    switch (tmpl) {
      default: {
        return new DefaultTemplateHandler(tmpl, generator, props);
      }
    }
  }
}

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
