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
  }
  install() {
  }
}
