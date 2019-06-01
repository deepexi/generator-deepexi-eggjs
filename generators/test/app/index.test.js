'use strict'
/* eslint-disable no-undef */

const assert = require('yeoman-assert')
var helpers = require('yeoman-test')
const path = require('path')

describe('generate app', () => {
  it('should exists files', () => {
    return helpers
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        projectTitle: 'hello',
        projectName: 'Hello'
      })
      .then(function () {
        assert.file('index.js')
        assert.file('app/controller/hello.js')
        assert.file('README.md')
      })
  })
})
