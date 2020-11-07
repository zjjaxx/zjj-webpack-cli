const { promisify } = require("util")
const download = promisify(require("download-git-repo"))
const ora = require('ora');
const chalk = require("chalk")
const log = content => console.log(chalk.greenBright(content))

module.exports = async (repository, name) => {
    const progress = ora()
    progress.start(log(`Loading ${repository}`));
    await download(repository, name)
    progress.succeed(log("download successful"))
}