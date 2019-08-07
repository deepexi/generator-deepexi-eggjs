'use strict'
/* eslint-disable no-undef */

const assert = require('assert');
const PackageJsonTemplateHandler = require('../../app/handler/package_json_th').cls;

describe('package json template handler', () => {
  before(() => {

  });

  describe('_extendDependencies()', () => {
    it('should add dependencies to pkg', () => {
      const handler = new PackageJsonTemplateHandler();
      const pkg = {};
      handler._extendDependencies(pkg, 'foo', '^1.0.0');
      assert.strictEqual(pkg.dependencies.foo, '^1.0.0');
    });
  })

  describe('_extendScript()', () => {
    it('should define new on script not exists', () => {
      const handler = new PackageJsonTemplateHandler();
      const pkg = {};
      handler._extendScript(pkg, 'dev', 'egg-bin dev');
      assert.strictEqual(pkg.scripts.dev, 'egg-bin dev');
    });

    it('should entend it on script not exists', () => {
      const handler = new PackageJsonTemplateHandler();
      const pkg = {
        scripts: {
          start: 'egg-scripts start'
        }
      };
      handler._extendScript(pkg, 'start', '--require skyapm-egg-require');
      assert.strictEqual(pkg.scripts.start, 'egg-scripts start --require skyapm-egg-require');
    });
  })
});
