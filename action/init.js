const {promisify} =require("util")
const figlet = promisify(require('figlet'));
const chalk =require("chalk")
const log=content=>console.log(chalk.greenBright(content))
const download=require("./download")
const execute=require("./execute")
const ora = require('ora');
module.exports =async name =>{
        log("start init "+name)
        const welcomeText=await figlet("welcome use zjj's cli")
        log(welcomeText)
        await download("zjjaxx/webpack-demo-4.44.1#update",name)
        const progress = ora()
        progress.start(log(`安装${name}依赖🚀...`));
        await execute(process.platform === 'win32' ? 'npm.cmd' : "npm",["i"],{cwd:`./${name}`})
        progress.succeed(log(`安装成功！`))
        await execute(process.platform === 'win32' ? 'npm.cmd' : "npm",["run","serve"],{cwd:`./${name}`})
}
