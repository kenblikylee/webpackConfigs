const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "插件命名"
      }
    ]).then(opts => {
      this.name = opts.name;
      this.pluginName = `plugin-${this.name}`;
      this.pluginPath = `plugins/${this.pluginName}`;
    });
  }
  default() {
    this.composeWith(require.resolve("../npm"), {
      pkgName: this.pluginName,
      generateInto: this.pluginPath
    });
    this.composeWith(require.resolve("../plugin"), {
      pluginName: this.pluginName
    });
    this.composeWith(require.resolve("../codemod"), {
      name: this.name,
      pluginName: this.pluginName
    });
  }
  writing() {
    this.fs.copy(
      this.templatePath("index.js"),
      this.destinationPath(this.pluginPath, "index.js")
    );
    this.fs.copy(
      this.templatePath("babel.config.js"),
      this.destinationPath(this.pluginPath, "babel.config.js")
    );
    this.fs.copy(
      this.templatePath("public/index.html"),
      this.destinationPath(this.pluginPath, "public", "index.html")
    );
    this.fs.copy(
      this.templatePath("public/favicon.ico"),
      this.destinationPath(this.pluginPath, "public", "favicon.ico")
    );
    this.fs.copy(
      this.templatePath("src/getters.js"),
      this.destinationPath(this.pluginPath, "src/getters.js")
    );

    this.fs.copyTpl(
      this.templatePath("src/main.ejs"),
      this.destinationPath(this.pluginPath, "src/main.js"),
      {
        name: this.name
      }
    );
    this.fs.copyTpl(
      this.templatePath("src/modules.ejs"),
      this.destinationPath(this.pluginPath, "src/modules.js"),
      {
        name: this.name
      }
    );
    this.fs.copyTpl(
      this.templatePath("src/routes.ejs"),
      this.destinationPath(this.pluginPath, "src/routes.js"),
      {
        name: this.name
      }
    );
    this.fs.copyTpl(
      this.templatePath("src/views/view.vue"),
      this.destinationPath(this.pluginPath, `src/views/${this.name}/index.vue`),
      {
        name: this.name
      }
    );
  }
  install() {
    this.yarnInstall();
  }
};
