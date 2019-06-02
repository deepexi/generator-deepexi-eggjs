'use strict';

const DefaultTemplateHandler = require('./default_th');
const StartCodeTemplateHandler = require('./start_code_sh_th');
const DockerfileTemplateHandler = require('./dockerfile_th');
const PackageJsonTemplateHandler = require('./package_json_th');

class TemplateHandlerFactory {
  static create (tmpl, generator, props) {
    let Cls;
    switch (tmpl) {
      case 'package.tmpl.json': {
        Cls = PackageJsonTemplateHandler; break;
      }
      case '.tmpl.Dockerfile': {
        Cls = DockerfileTemplateHandler; break;
      }
      case 'start-code.tmpl.sh': {
        Cls = StartCodeTemplateHandler; break;
      }
      default: {
        Cls = DefaultTemplateHandler; break;
      }
    }
    return new Cls(tmpl, generator, props);
  }
}

module.exports = TemplateHandlerFactory;
