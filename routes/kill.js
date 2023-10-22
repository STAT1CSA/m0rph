const { spawn } = require('child_process');

// Replace 1234 with the PID of the process you want to kill
const pid = 2721;

// Spawn a new process to execute the kill command
const killProcess = spawn('kill', [pid]);

// Listen for the 'exit' event to determine if the process was killed successfully
killProcess.on('exit', (code, signal) => {
    if (code === 0) {
        console.log(`Process ${pid} was killed successfully`);
    } else {
        console.error(`Failed to kill process ${pid}: ${signal}`);
    }
});