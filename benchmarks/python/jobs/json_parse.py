import json


def json_parse():
    data = [{"id": i, "v": i * 2} for i in range(200_000)]
    raw = json.dumps(data)
    parsed = json.loads(raw)

    return sum(x["v"] for x in parsed)
