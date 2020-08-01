import cluster from 'cluster';
import express from 'express';
import crypto from "crypto";

console.log('UV_THREADPOOL_SIZE: ', process.env.UV_THREADPOOL_SIZE);

// Using ab
// ab -c 50 -n 500 localhost:3000/

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but
    // in child mode
    cluster.fork();
    cluster.fork();
    /*
     * Increasing number of children DOES NOT mean your server will respond faster
     * Generally children should be equal to number of cores
     * In case where multi threading is enabled, it can go higher
     */
    // cluster.fork(); // wrong
    // cluster.fork(); // wrong
    // cluster.fork(); // wrong
    // cluster.fork(); // wrong
    // cluster.fork(); // wrong
} else {
    // I am a child, I'am going to ack like a server
    // and do nothing else
    const app = express();

    app.get('/', (req, res) => {
        // res will be send after 5 s
        crypto.pbkdf2(
            'a',
            'b',
            100000,
            512,
            'sha512',
            () => {
                res.send('Hello World');
            });
        console.log('Handled by Worker: ', cluster.worker.id);
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!');
    })

    app.listen(3000, () => {
        console.log('App listening on 3000')
    });
}
