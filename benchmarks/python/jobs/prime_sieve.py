def prime_sieve(n=20000000):
    sieve = bytearray(b"\x01") * (n + 1)
    sieve[0:2] = b"\x00\x00"

    for i in range(2, int(n**0.5) + 1):
        if sieve[i]:
            start = i * i
            sieve[start : n + 1 : i] = b"\x00" * len(sieve[start : n + 1 : i])

    return sum(sieve)
