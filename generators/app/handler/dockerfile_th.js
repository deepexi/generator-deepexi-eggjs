'use strict';

const AbstractTemplateHandler = require('./abstract_template_handler');
const _ = require('lodash')

class DockerfileTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)))
    this.generator.fs.write(this.generator.destinationPath('Dockerfile'), tpl(this.props))
  }
}

module.exports = DockerfileTemplateHandler;
