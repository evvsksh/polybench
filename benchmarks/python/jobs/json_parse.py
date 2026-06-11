import json
import time


def json_parse():
    start = time.time()

    data = [{"id": i, "arr": list(range(20))} for i in range(500_000)]

    raw = json.dumps(data)
    parsed = json.loads(raw)

    total = 0
    for x in parsed:
        total += len(x["arr"])

    elapsed = (time.time() - start) * 1000

    return {"success": True, "timeElapsedMs": elapsed, "memDeltaKb": 0}
