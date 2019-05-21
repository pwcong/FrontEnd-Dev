const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const prettier = require('prettier');
const changeCase = require('change-case');

const { packagesPath, getPackagesMap } = require('../utils');

const dependencies = ['@rc-x/style', '@rc-x/utils'];
const devDependencies = ['@rc-x/test'];

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名称（无需 @rc-x 前缀）',
      validate: input => {
        if (!input) {
          console.log(chalk.red(' 组件名称不能为空'));
          return false;
        }

        if (input !== changeCase.paramCase(input)) {
          console.log(
            chalk.red(' 组件名称不符合规范（小写字母，多词横杠连接）')
          );
          return false;
        }

        const distPath = path.join(packagesPath, input);

        if (fs.pathExistsSync(distPath)) {
          console.log(chalk.red(' 组件目录已存在'));
          return false;
        }

        return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: '请输入组件描述'
    }
  ])
  .then(answer => {
    const { name, description } = answer;

    const componentName = changeCase.pascalCase(name);
    const distPath = path.join(packagesPath, name);

    // 1. 生成包 package.json
    const packagesMap = getPackagesMap();
    const package = Object.assign({
      name: `@rc-x/${name}`,
      version: '0.0.1',
      description: description,
      author: 'Pwcong <pwcong@foxmail.com>',
      main: 'dist/bundle.min.js',
      module: 'dist/bundle.es.js',
      keywords: [`rc-x-${name}`],
      license: 'MIT',
      dependencies: {},
      devDependencies: {}
    });
    dependencies.forEach(d => {
      package['dependencies'][d] = '^' + packagesMap[d].version;
    });
    devDependencies.forEach(d => {
      package['devDependencies'][d] = '^' + packagesMap[d].version;
    });
    fs.outputFileSync(
      path.join(distPath, 'package.json'),
      prettier.format(JSON.stringify(package), {
        parser: 'json'
      })
    );

    // 2. 生成样式 style.scss
    fs.outputFileSync(
      path.join(distPath, 'style.scss'),
      prettier.format(
        `
        @import '~@rc-x/style/common.scss';
        
        $${name}-prefix-cls: #{$prefix-cls}-${name};
        .#{$${name}-prefix-cls} { }
      `,
        {
          parser: 'scss',
          singleQuote: true
        }
      )
    );

    // 3. 生成组件入口 index.tsx
    fs.outputFileSync(
      path.join(distPath, 'index.tsx'),
      prettier.format(
        `
        import React from 'react';
        
        import { classNames, getPrefixCls } from '@rc-x/utils';
        
        import './style.scss';

        const baseCls = getPrefixCls('${name}');

        export interface IProps {};

        const ${componentName} = (props: IProps) => {
          return <div className={classNames(baseCls)}>Hello World!</div>;
        }

        export default ${componentName};

      `,
        {
          parser: 'babel',
          semi: true,
          singleQuote: true
        }
      )
    );

    // 4. 生成测试入口 index.tsx
    fs.outputFileSync(
      path.join(distPath, '__tests__/index.tsx'),
      prettier.format(
        `
        import React from 'react';
        import Test from '@rc-x/test';
        
        import ${componentName} from '../index';
        import packageJson from '../package.json';
        
        export default function() {
          return (
            <Test
              component={${componentName}}
              componentProps={{}}
              componentTestProps={{}}
              componentPackageJson={packageJson}
            />
          );
        }        

      `,
        {
          parser: 'babel',
          semi: true,
          singleQuote: true
        }
      )
    );
  });
