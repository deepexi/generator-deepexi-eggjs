'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;

class PackageJsonTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
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
    this._extendDependencies(pkgJson, 'deepexi-onerror', '^0.2.0');

    if (this.props.router === 'router-plus') {
      this._extendDependencies(pkgJson, 'egg-router-plus', '^1.3.0');
    }

    if (this.props.dependencies.utils) {
      this._extendDependencies(pkgJson, '@taccisum/egg-utils', '^0.1.0');
    }
    if (this.props.dependencies.eureka) {
      this._extendDependencies(pkgJson, '@taccisum/egg-eureka', '^1.0.1');
    }
    if (this.props.dependencies.swagger) {
      this._extendDependencies(pkgJson, 'egg-swagger-doc', '^2.3.1');
    }
    if (this.props.dependencies.tx) {
      this._extendDependencies(pkgJson, 'egg-tx', '^1.0.2');
    }
    if (this.props.exporter) {
      this._extendDependencies(pkgJson, 'egg-exporter', '^1.1.1')
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
        this._extendDependencies(pkgJson, '@taccisum/egg-apollo', '^1.0.2');
        break;
      }
      default: {
        break;
      }
    }

    switch (this.props.apm) {
      case 'skywalking': {
        this._extendDependencies(pkgJson, 'skyapm-egg-require', '^0.1.5');
        this._extendScript(pkgJson, 'start', `--require skyapm-egg-require --sw_service_name=${this.props.projectName} --sw_direct_Servers=${this.props.swServers || 'localhost:11800'}`)
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

  _extendScript (pkgJson, scriptName, content) {
    if (!pkgJson.scripts) {
      pkgJson.scripts = {};
    }
    if (!pkgJson.scripts[scriptName]) {
      pkgJson.scripts[scriptName] = content;
    } else {
      pkgJson.scripts[scriptName] = `${pkgJson.scripts[scriptName]} ${content}`;
    }
  }
}

module.exports = {
  key: 'pkg',
  cls: PackageJsonTemplateHandler
};
