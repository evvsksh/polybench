use serde_json::json;
use std::time::Instant;

pub fn run() -> serde_json::Value {
    let start = Instant::now();

    let mut data = Vec::with_capacity(500_000);

    for i in 0..500_000 {
        let arr: Vec<i32> = (0..20).collect();
        data.push(serde_json::json!({
            "id": i,
            "arr": arr
        }));
    }

    let raw = serde_json::to_string(&data).unwrap();
    let parsed: serde_json::Value = serde_json::from_str(&raw).unwrap();

    let mut _sum = 0;

    for item in parsed.as_array().unwrap() {
        _sum += item["arr"].as_array().unwrap().len();
    }

    let elapsed = start.elapsed().as_millis();

    json!({
        "success": true,
        "timeElapsedMs": elapsed,
        "memDeltaKb": 0
    })
}
