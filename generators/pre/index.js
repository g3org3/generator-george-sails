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
      // {
      //   type: 'input',
      //   name: 'user',
      //   message: 'What is the name of your component',
      //   default: 'User'
      // }
    ]

    return this.prompt(prompts).then(function (props) {
      this.props = props
    }.bind(this))
  },

  app: function () {
    // Server file
    // purdy(this.props)
    // this.fs.copyTpl(
    //   this.templatePath('server.js'),
    //   this.destinationPath('server.js'),
    //   this.destinationPath('/views/index.ejs'), {
    //     name: this.props.name
    //   }
    // )
  },

  // Writing Logic here
  writing: {
    // Copy the configuration files
    config: function () {
      // this.fs.copyTpl(
      //     this.templatePath('_package.json'),
      //     this.destinationPath('package.json'), {
      //         name: this.props.name
      //     }
      // )
      // this.fs.copyTpl(
      //     this.templatePath('_bower.json'),
      //     this.destinationPath('bower.json'), {
      //         name: this.props.name
      //     }
      // )
      this.fs.copy(
        this.templatePath('pre-commit.sh'),
        this.destinationPath('.git/hooks/pre-commit')
      )
    }

    // Copy application files

    // Install Dependencies
  },

  install: function () {
    // this.installDependencies()
  }
})
