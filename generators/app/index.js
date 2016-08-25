'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wicked ' + chalk.green('generator-george-sails') + ' generator!'
    ))

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your proyect',
        default: 'GTemplate'
      },
      {
        type: 'confirm',
        name: 'login',
        message: 'Would you like to login with passportjs?',
        default: true
      },
      {
        type: 'confirm',
        name: 'es6',
        message: 'Enable ES6/2015 support?',
        default: true
      }
      // {
      //   type: 'confirm',
      //   name: 'email',
      //   message: 'Would you like to send email with mailgun?',
      //   default: false
      // }
      // {
      //   type: 'list',
      //   name: 'db',
      //   message: 'What db would you like?',
      //   choices: [
      //     'none',
      //     // 'postgresql',
      //     // 'mongodb',
      //     // 'mysql',
      //     'sails-disk'
      //   ],
      //   default: 0
      // }
    ]

    return this.prompt(prompts).then(function (props) {
      this.props = props
    }.bind(this))
  },

  app: function () {
    // console.log(this.props)
  },

  _hidwrite: function (dir, filename, replace) {
    this._genwrite(dir, '_' + filename, '.' + filename)
  },

  _genwrite: function (dir, filename, replace) {
    if (replace == null) {
      replace = filename
    }
    this.fs.copy(
      this.templatePath(filename),
      this.destinationPath(dir + replace)
    )
  },

  // Writing Logic here
  writing: {
    // Copy the configuration files
    config: function () {
      var dir = ''
      if (this.props.name && this.props.name !== 'test') {
        dir = this.props.name + '/'
      }

      this.fs.copy(
        this.templatePath('**/*.*'),
        this.destinationPath(dir)
      )

      this.fs.copy(
        this.templatePath('Dockerfile'),
        this.destinationPath(dir + 'Dockerfile')
      )

      // package.json
      var pkg = JSON.parse(this.read('packagejson'))
      if (this.props['es6']) {
        pkg.dependencies['babel-plugin-transform-es2015-destructuring'] = '^6.9.0'
        pkg.dependencies['babel-plugin-transform-object-rest-spread'] = '^6.8.0'
        pkg.dependencies['babel-preset-es2015'] = '^6.13.2'
        pkg.devDependencies['sails-hook-babel'] = '^6.0.1'
      }

      if (this.props.login) {
        pkg.dependencies['passport'] = '^0.3.2'
        pkg.dependencies['passport-local'] = '^1.0.0'
        pkg.dependencies['sails-auth'] = '^2.1.3'
        this._genwrite(dir, '_config_authjs', 'config/auth.js')
        this._genwrite(dir, '_config_passportjs', 'config/passport.js')
      }

      if (this.props.db !== 'none') {
        const dbs = {
          'sails-disk': '~0.10.9'
        }
        pkg.dependencies[this.props.db] = dbs[this.props.db]
      }

      this.write(dir + 'package.json', JSON.stringify(pkg, null, 2))

      if (this.props['es6']) {
        this._hidwrite(dir, 'babelrc')
      }

      this._hidwrite(dir, 'gitignore')
      this._hidwrite(dir, 'sailsrc')
      this._hidwrite(dir, 'dockerignore')
      this._hidwrite(dir, 'editorconfig')
    }

    // Copy application files

    // Install Dependencies
  },

  install: function () {
    // var command = chalk.green('cd ' + this.props.name + ' && npm i')
    // console.log('----------------------------------')
    // console.log('One last step, Now run: ')
    // console.log(command)
    // console.log('----------------------------------')
    return
    // this.installDependencies()
  }
})
