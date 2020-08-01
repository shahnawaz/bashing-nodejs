import express from 'express';

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

app.listen(3000, () => {
    console.log('App listening on 3000')
});