import {exec} from 'child_process';
import {execFile} from 'child_process';

export function run(task, callback) {
    if (task.command) {
        return runCommand(task.command, (error, stdout, stderr) => {
            log(error, stdout, stderr);

            return callback(stdout, stderr || error);
        });
    }
    if (task.filePath) {
        return runFile(task.filePath, (error, stdout, stderr) => {
            log(error, stdout, stderr);
            return callback(stdout, stderr || error);
        });
    }
}

function runCommand(command: string, callback) {
    exec(command, callback);
}

function runFile(filePath: string, callback) {
    execFile(filePath, [], callback);
}

function log(error, stdout, stderr) {
    console.log(`error: ${error}`);
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
}

