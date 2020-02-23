const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      // {
      //   type: "rawlist",
      //   name: "type",
      //   message: "生成什么？",
      //   choices: [ 'plugin', 'page', 'component' ],
      //   default: 0
      // },
      {
        type: "input",
        name: "name",
        message: "插件命名"
      }
    ]).then(opts => {
      this.name = opts.name
      this.pluginName = `plugin-${this.name}`
      this.pluginPath = `plugins/${this.pluginName}`
    })
  }
  default() {
    this.composeWith(require.resolve('../npm'), {
      pkgName: this.pluginName,
      generateInto: this.pluginPath
    })
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath(this.pluginPath, 'index.js'),
      {
        name: this.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('main.ejs'),
      this.destinationPath(this.pluginPath, 'src', 'main.js'),
      {
        name: this.name
      }
    );
    this.fs.copy(
      this.templatePath('babel.config.js'),
      this.destinationPath(this.pluginPath, 'babel.config.js')
    );
    this.fs.copy(
      this.templatePath('public/index.html'),
      this.destinationPath(this.pluginPath, 'public', 'index.html')
    );
    this.fs.copy(
      this.templatePath('public/favicon.ico'),
      this.destinationPath(this.pluginPath, 'public', 'favicon.ico')
    );
  }
  install() {
    this.yarnInstall()
  }
}
