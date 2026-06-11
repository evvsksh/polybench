import json


def json_parse():
    data = [{"id": i, "arr": list(range(20))} for i in range(500_000)]

    raw = json.dumps(data)
    parsed = json.loads(raw)

    return sum(len(x["arr"]) for x in parsed)
