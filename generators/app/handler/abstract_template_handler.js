'use strict';

class AbstractTemplateHandler {
  constructor (tmpl, generator, props) {
    this.tmpl = tmpl;
    this.generator = generator;
    this.props = props;
  }

  handle () {
    throw new Error('must implement handle()');
  }
}

module.exports = AbstractTemplateHandler;
