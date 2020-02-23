'use strict';
const Generator = require('yeoman-generator');
const j = require('jscodeshift');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.option('name', {
      type: String,
      required: true,
      desc: '插件名'
    });
    this.option('pluginName', {
      type: String,
      required: true,
      desc: '插件包名'
    });
  }

  initializing() {
    let mainFile = this.destinationPath('src/main.js')
    let mainSource = fs.readFileSync(mainFile, { encoding: 'utf-8' })
    const root = j(mainSource);
    const declarations = root.find(j.ImportDeclaration)
    const toImportAST = i => j(`${i}\n`).nodes()[0].program.body[0]
    const toIdenAst = i => j(i).nodes()[0].program.body[0].expression.elements[0]
    let importsCode = `import ${this.options.name} from '${this.options.pluginName}';`
    if (declarations.length) {
      declarations
        .at(-1)
        // a tricky way to avoid blank line after the previous import
        .forEach(({ node }) => delete node.loc)
        .insertAfter(toImportAST(importsCode))
    } else {
      // no pre-existing import declarations
      root.get().node.program.body.unshift(toImportAST(importsCode))
    }

    root.find(j.ArrayExpression).at(-1).__paths[0].value.elements.push(toIdenAst(`[${this.options.name}]`))
    this.source = root.toSource()
  }

  writing() {
    fs.writeFileSync(this.destinationPath('src/main.js'), this.source, { encoding: 'utf-8' })
  }
};
