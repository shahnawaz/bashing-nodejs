import express from 'express';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

const app = express();

app.get('/', (req, res) => {
    // Starts counter-worker.js in a separate thread (in paraller)
    const counterWorker = new Worker('./counter-worker.js');
    const counterWorkerThreadId = counterWorker.threadId;

    // Receives any message from counterWorker
    counterWorker.on('message', (message) => {
        console.log(`Message from Worker '${counterWorkerThreadId}':`, message);
        res.send('' + message);
    });

    // When worker is finished
    counterWorker.on('exit', code => {
        console.log(`Worker '${counterWorkerThreadId}' exited with code:`, code);
    });
});

app.listen(3000, () => {
    console.log('App listening on 3000')
});
