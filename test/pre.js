'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

/* globals describe, before, it */

describe('generator-george-sails:pre', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/pre'))
      .withPrompts({})
      .toPromise()
  })

  it('creates file', function () {
    assert.file([
      '.git/hooks/pre-commit'
    ])
  })
})
