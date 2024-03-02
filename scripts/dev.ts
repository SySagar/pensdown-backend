import { exec } from 'child_process';

process.env.NODE_ENV = 'test';
const command = '$env:NODE_ENV="test"';

// Execute the command
const childProcess = exec(command);

childProcess.stdout?.pipe(process.stdout);
childProcess.stderr?.pipe(process.stderr);

childProcess.on('exit', (code) => {
  process.exit(code || 0);
});
