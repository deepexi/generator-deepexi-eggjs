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
    this._extendDependencies(pkgJson, 'deepexi-body', '^0.0.1');
    this._extendDependencies(pkgJson, 'deepexi-onerror', '^0.0.1');

    if (this.props.dependencies.utils) {
      this._extendDependencies(pkgJson, '@taccisum/egg-utils', '^0.0.1');
    }
    if (this.props.dependencies.eureka) {
      this._extendDependencies(pkgJson, '@taccisum/egg-eureka', '^1.0.1');
    }
    if (this.props.dependencies.swagger) {
      this._extendDependencies(pkgJson, 'egg-swagger-doc', '^2.3.1');
    }
    switch (this.props.db) {
      case 'mongo': {
        this._extendDependencies(pkgJson, 'egg-mongoose', '^3.1.3');
        break;
      }
      case 'mysql': {
        this._extendDependencies(pkgJson, 'egg-sequelize', '^4.1.0');
        this._extendDependencies(pkgJson, 'mysql2', '1.6.4');
        break;
      }
      default: {
        break;
      }
    }
    switch (this.props.configservice) {
      case 'apollo': {
        this._extendDependencies(pkgJson, '@taccisum/egg-apollo', '^1.0.1');
        break;
      }
      default: {
        break;
      }
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
