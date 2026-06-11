function prime_sieve() {
    const n = 20000000;

    const sieve = new Uint8Array(n + 1);
    sieve.fill(1);
    sieve[0] = 0;
    sieve[1] = 0;

    for (let i = 2; i * i <= n; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= n; j += i) {
                sieve[j] = 0;
            }
        }
    }

    let count = 0;
    for (let i = 0; i <= n; i++) {
        count += sieve[i];
    }

    return count;
}

module.exports = { prime_sieve };
