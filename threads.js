import crypto from 'crypto';

const start = Date.now();

// First time we called pbkdf2 only once and it took 524ms

// Second time we called it twice in parallel
// Both calls will be executed more or less at the same time

// Second run: 564ms
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

// Second run: 567ms
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
});