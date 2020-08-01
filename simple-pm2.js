import cluster from 'cluster';
import express from 'express';
import crypto from "crypto";

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
