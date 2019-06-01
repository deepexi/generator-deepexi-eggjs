'use strict';

class AbstractTemplateHandler {
  constructor (tmpl, generator, props) {
    this.tmpl = tmpl;
    this.generator = generator;
    this.props = props;
  }
}

module.exports = AbstractTemplateHandler;
