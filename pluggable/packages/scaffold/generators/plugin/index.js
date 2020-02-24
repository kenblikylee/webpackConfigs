"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.option("pluginName", {
      type: String,
      required: true,
      desc: "插件名"
    });
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath("package.json"), {});
    if (!this.pkg.plugins) {
      this.pkg.plugins = [];
    }
  }

  writing() {
    if (!this.pkg.plugins.includes(this.options.pluginName)) {
      this.pkg.plugins.push(this.options.pluginName);
      this.fs.writeJSON(this.destinationPath("package.json"), this.pkg);
    }
  }
};
