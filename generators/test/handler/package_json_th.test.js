'use strict'
/* eslint-disable no-undef */

const assert = require('assert');
const PackageJsonTemplateHandler = require('../../app/handler/package_json_th');

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
});
