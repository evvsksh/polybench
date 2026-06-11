use serde_json::json;
use std::time::Instant;

pub fn run() -> serde_json::Value {
    let start = Instant::now();

    let n = 20000000;
    let mut is_prime = vec![true; n + 1];

    if n > 0 {
        is_prime[0] = false;
    }
    if n > 1 {
        is_prime[1] = false;
    }

    for i in 2..=n {
        if is_prime[i] {
            let mut j = i * 2;
            while j <= n {
                is_prime[j] = false;
                j += i;
            }
        }
    }

    let count = is_prime.iter().filter(|&&x| x).count();

    let elapsed = start.elapsed().as_millis();

    json!({
        "success": true,
        "timeElapsedMs": elapsed,
        "memDeltaKb": 0,
        "result": count
    })
}
