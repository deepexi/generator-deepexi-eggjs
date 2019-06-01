'use strict';

const AbstractTemplateHandler = require('./abstract_template_handler');
const _ = require('lodash')
const fileUtils = require('../../util/file_utils')

class PackageJsonTemplateHandler extends AbstractTemplateHandler {
  handle () {
    const pkgJson = JSON.parse(this._readTemplate());
    this._extend(pkgJson)

    this.generator.fs.writeJSON(this.generator.destinationPath(fileUtils.tmplToFileName(this.tmpl)), pkgJson);
  }

  _readTemplate () {
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)));
    const pkgTxt = tpl(this.props);
    return pkgTxt;
  }

  _extend (pkgJson) {
    if (this.props.dependencies.eureka) {
      this._extendDependencies(pkgJson, '@taccisum/egg-eureka', '^1.0.1');
    }
  }

  _extendDependencies (pkgJson, pkgName, version) {
    if (!pkgJson.dependencies) {
      pkgJson.dependencies = {};
    }
    pkgJson.dependencies[pkgName] = version;
  }
}

module.exports = PackageJsonTemplateHandler;
