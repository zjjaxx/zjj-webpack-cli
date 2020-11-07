const child_process = require('child_process');
module.exports=(...args)=>{
    return new Promise((resolve,reject)=>{
        const workerProcess =child_process.spawn(...args);
        workerProcess.stdout.pipe(process.stdout)
        workerProcess.stderr.pipe(process.stderr)
         workerProcess.on('close', function (code) {
            resolve("close")
         });
    })
}