import { parentPort, threadId } from 'worker_threads';

console.log('Started Worker Thread:', threadId);

// Do some heavy lifting
let counter = 0;

while (counter < 1e9) {
    counter++;
}

parentPort.postMessage(counter);

parentPort.close();

// process.exit(-1); // in case of error