'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

/* globals describe, before, it */

describe('generator-george-sails:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test',
        login: false,
        'es6': false
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      'package.json'
    ])
  })
})

describe('generator-george-sails:app --login', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test',
        login: true,
        'es6': false
      })
      .toPromise()
  })

  it('ignores to create a .babelrc', function () {
    assert.noFile([
      '.babelrc'
    ])
  })

  it('creates auth file and passportjs', function () {
    assert.file([
      'package.json',
      'config/auth.js',
      'config/passport.js'
    ])
  })
})

describe('generator-george-sails:app --es6', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test',
        login: false,
        'es6': true
      })
      .toPromise()
  })

  it('creates .babelrc', function () {
    assert.file([
      '.babelrc'
    ])
  })
})
