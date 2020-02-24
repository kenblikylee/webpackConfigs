"use strict";
const _ = require("lodash");
const extend = _.merge;
const Generator = require("yeoman-generator");
const parseAuthor = require("parse-author");
const originUrl = require("git-remote-origin-url");

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.option("pkgName", {
      type: String,
      required: false,
      defaults: "",
      alias: "n",
      desc: "包名"
    });
    this.option("generateInto", {
      type: String,
      required: false,
      defaults: "",
      alias: "t",
      desc: "生成目录"
    });
  }

  async initializing() {
    this.pkg = this.fs.readJSON(
      this.destinationPath(this.options.generateInto, "package.json"),
      {}
    );

    this.props = {
      name: this.pkg.name || this.options.pkgName,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      keywords: this.pkg.keywords
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (_.isString(this.pkg.author)) {
      const info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }

    if (!this.props.authorName) {
      this.props.authorName = this.config.get("authorName");
    }
    if (!this.props.authorEmail) {
      this.props.authorEmail = this.config.get("authorEmail");
    }

    if (!this.props.homepage) {
      return originUrl(this.destinationPath(this.options.generateInto)).then(
        url => {
          this.props.homepage = url;
        }
      );
    } else {
      return Promise.resolve();
    }
  }

  _askFor() {
    const prompts = [
      {
        name: "name",
        message: "项目名称",
        when: !this.props.name
      },
      {
        name: "description",
        message: "项目介绍",
        when: !this.props.description
      },
      {
        name: "homepage",
        message: "项目主页",
        when: !this.props.homepage
      },
      {
        name: "authorName",
        message: "开发者姓名(英文)",
        when: !this.props.authorName,
        default: this.user.git.name(),
        store: true
      },
      {
        name: "authorEmail",
        message: "开发者邮箱",
        when: !this.props.authorEmail,
        default: this.user.git.email(),
        store: true
      },
      {
        name: "keywords",
        message: '关键词（多个以逗号","分隔）',
        when: !this.pkg.keywords,
        filter(words) {
          return words.split(/\s*,\s*/g);
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  prompting() {
    return this._askFor();
  }

  writing() {
    const generateInto = this.options.generateInto;
    const currentPkg = this.fs.readJSON(
      this.destinationPath(generateInto, "package.json"),
      {}
    );

    const pkg = extend(
      {
        name: this.props.name,
        version: "1.0.0-alpha",
        license: "MIT",
        description: this.props.description,
        homepage: this.props.homepage,
        author: {
          name: this.props.authorName || this.props.githubAccount,
          email: this.props.authorEmail,
          url: this.props.authorUrl
        },
        main: "index.js",
        keywords: [],
        scripts: {
          serve: "vue-cli-service serve",
          build: "vue-cli-service build"
        },
        dependencies: {},
        devDependencies: {
          "@vue/cli-plugin-babel": "^4.2.0"
        },
        peerDependencies: {
          vue: "^2.6.11",
          "vue-router": "^3.1.5",
          vuex: "^3.1.2"
        },
        engines: {
          node: ">= 8.9.0"
        }
      },
      currentPkg
    );

    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    this.fs.writeJSON(this.destinationPath(generateInto, "package.json"), pkg);
  }
};
