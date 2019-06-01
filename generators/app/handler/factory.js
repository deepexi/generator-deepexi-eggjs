'use strict';

const DefaultTemplateHandler = require('./default_th');
const PackageJsonTemplateHandler = require('./package_json_th');

class TemplateHandlerFactory {
  static create (tmpl, generator, props) {
    switch (tmpl) {
      case 'package.tmpl.json': {
        return new PackageJsonTemplateHandler(tmpl, generator, props);
      }
      default: {
        return new DefaultTemplateHandler(tmpl, generator, props);
      }
    }
  }
}

module.exports = TemplateHandlerFactory;
