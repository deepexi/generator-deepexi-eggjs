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
  }

  _extend (pkg) {
    this._extendDependencies(pkg, '@deepexi/eureka', '^1.0.0');
  }

  _extendDependencies (pkg, pkgName, version) {
    if (!pkg.dependencies) {
      pkg.dependencies = {};
    }
    pkg.dependencies[pkgName] = version;
  }
}

module.exports = PackageJsonTemplateHandler;
