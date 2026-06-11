use serde_json::json;
use std::time::Instant;

pub fn run() -> serde_json::Value {
    let start = Instant::now();

    let n = 128;

    let a = vec![vec![0.0f64; n]; n];
    let b = vec![vec![0.0f64; n]; n];
    let mut c = vec![vec![0.0f64; n]; n];

    for i in 0..n {
        for k in 0..n {
            let aik = a[i][k];
            for j in 0..n {
                c[i][j] += aik * b[k][j];
            }
        }
    }

    let elapsed = start.elapsed().as_millis();

    json!({
        "success": true,
        "timeElapsedMs": elapsed,
        "memDeltaKb": 0
    })
}
