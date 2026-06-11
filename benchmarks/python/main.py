import json
import time
import traceback

import psutil
from jobs import json_parse, matrix_mul, prime_sieve


def run_bench(fn):
    p = psutil.Process()

    mem_before = p.memory_info().rss
    t0 = time.perf_counter()

    error = None
    success = False

    try:
        fn()
        success = True
    except Exception as e:
        error = str(e)
        traceback.format_exc()

    t1 = time.perf_counter()
    mem_after = p.memory_info().rss

    return {
        "success": success,
        "timeElapsedMs": (t1 - t0) * 1000,
        "memDeltaKb": (mem_after - mem_before) / 1024,
        "error": error,
    }


def main():
    results = {
        "language": "python",
        "benchmarks": {
            "prime_sieve": run_bench(prime_sieve.prime_sieve),
            "json_parse": run_bench(json_parse.json_parse),
            "matrix_mul": run_bench(matrix_mul.matrix_mul),
        },
    }

    print(json.dumps(results))


if __name__ == "__main__":
    main()
