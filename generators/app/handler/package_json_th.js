'use strict';

const AbstractTemplateHandler = require('./abstract_template_handler');
const _ = require('lodash')
const fileUtils = require('../../util/file_utils')

class PackageJsonTemplateHandler extends AbstractTemplateHandler {
  handle () {
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)));
    const pkgTxt = tpl(this.props);

    const pkg = JSON.parse(pkgTxt);
    this._extend(pkg)

    this.generator.fs.writeJSON(this.generator.destinationPath(fileUtils.tmplToFileName(this.tmpl)), pkg);
    console.log(pkg);
  }

  _extend (pkg) {
    _.assignIn(pkg.dependencies, {
      '@deepexi/eureka': '^1.0.0'
    });
  }
}

module.exports = PackageJsonTemplateHandler;
