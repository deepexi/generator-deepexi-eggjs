'use strict'
/* eslint-disable no-undef */

const assert = require('yeoman-assert')
var helpers = require('yeoman-test')
const path = require('path')

describe('generate app', () => {
  before(() => {
    return helpers
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        projectName: 'taccisum-service'
      })
      .then(() => {
      })
  });

  it('should exists project files', () => {
    assert.file('app.js')
    assert.file('.gitignore')
    assert.file('.eslintrc')
    assert.file('.eslintignore')
    assert.file('.autod.conf.js')
    assert.file('start-code.sh')
    assert.file('package.json')
    assert.file('Dockerfile')
    assert.file('LICENSE')
    assert.file('README.md')
  })

  it('should exists app files', () => {
    assert.file('app/controller/home.js')
  })

  it('should exists config files', () => {
    assert.file('config/config.default.js')
    assert.file('config/config.local.js')
    assert.file('config/config.dev.js')
    assert.file('config/config.qa.js')
    assert.file('config/config.prod.js')
    assert.file('config/plugin.js')
  })

  it('should exists unit test files', () => {
    assert.file('test/app/controller/home.test.js')
  })
})
