'use strict'
var Generator = require('yeoman-generator')

const _ = require('lodash')
const path = require('path')
const fileUtils = require('../util/file_utils')

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
        const readmeTpl = _.template(this.fs.read(this.templatePath(f)))
        this.fs.write(this.destinationPath(fileUtils.tmplToFileName(f)), readmeTpl(this.props))
      }
    })
  }
}
