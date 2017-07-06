const exec = require('child_process').exec;
const execFile = require('child_process').execFile;

function run(task, callback) {
  if (task.command) {
    return runCommand(task.command, (error, stdout, stderr) => {
      log(error, stdout, stderr);

      return callback(stdout, stderr);
    });
  }
  if (task.filePath) {
    return runFile(task.filePath, (error, stdout, stderr) => {
      log(error, stdout, stderr);
      return callback(stdout, stderr);
    });
  }
}


function runCommand(command, callback) {
  exec(command, callback);
}

function runFile(filePath, callback) {
  execFile(filePath, [], callback);
}

function log(error, stdout, stderr) {
  console.log(`error: ${error}`);
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
}

module.exports = run;