#!/usr/bin/env node
// 使用shell方式执行js代码
const { program } = require('commander');
program.version(require("../package.json").version);

program
  .command('init <name>')
  .description('init a webpack demo')
  .action(require("../action/init"));

  program.parse(process.argv);