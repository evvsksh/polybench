mod jobs;

use serde_json::json;
use std::fs;

fn rss_kb() -> usize {
    let status = fs::read_to_string("/proc/self/status").unwrap();

    for line in status.lines() {
        if line.starts_with("VmRSS:") {
            return line
                .split_whitespace()
                .nth(1)
                .unwrap()
                .parse::<usize>()
                .unwrap();
        }
    }

    0
}

fn measure<F, R>(f: F) -> (R, isize)
where
    F: FnOnce() -> R,
{
    let before = rss_kb();
    let result = f();
    let after = rss_kb();

    (result, after as isize - before as isize)
}

fn main() {
    let (prime, prime_mem) = measure(jobs::prime_sieve::run);
    let (json_parse, json_mem) = measure(jobs::json_parse::run);
    let (matrix, matrix_mem) = measure(jobs::matrix_mul::run);

    println!(
        "{}",
        json!({
            "language": "rust",
            "benchmarks": {
                "prime_sieve": {
                    "success": true,
                    "timeElapsedMs": prime["timeElapsedMs"],
                    "memDeltaKb": prime_mem,
                    "error": null
                },
                "json_parse": {
                    "success": true,
                    "timeElapsedMs": json_parse["timeElapsedMs"],
                    "memDeltaKb": json_mem,
                    "error": null
                },
                "matrix_mul": {
                    "success": true,
                    "timeElapsedMs": matrix["timeElapsedMs"],
                    "memDeltaKb": matrix_mem,
                    "error": null
                }
            }
        })
    );
}
