import cluster from 'cluster';
import express from 'express';

// console.log(cluster.isMaster); // will be true first time

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but
    // in child mode
    cluster.fork();
    // with 1 child
    // request '/fast' has to wait till '/' frees up the event loop

    // However, with additional childs/forks
    // request '/fast' can be handled by a separate (available) child instantly
    cluster.fork();
} else {
    // I am a child, I'am going to ack like a server
    // and do nothing else
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        // keep running till duration
        // while this loop is running
        // our entire serve will block any other request
        // coming in
        // Test: One 2 tabs and quickly enter the url
        // the second tab will take >5s to load
        while (Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        doWork(5000);
        // res will be send after 5 s
        res.send('Hello World');
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!');
    })

    app.listen(3000, () => {
        console.log('App listening on 3000')
    });
}