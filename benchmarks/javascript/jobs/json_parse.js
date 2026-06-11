function json_parse() {
  const start = performance.now();

  const data = [];

  for (let i = 0; i < 500000; i++) {
    data.push({
      id: i,
      arr: Array.from({ length: 20 }, (_, x) => x),
    });
  }

  const raw = JSON.stringify(data);
  const parsed = JSON.parse(raw);

  let sum = 0;

  for (let i = 0; i < parsed.length; i++) {
    sum += parsed[i].arr.length;
  }

  const end = performance.now();

  return {
    success: true,
    timeElapsedMs: end - start,
    memDeltaKb: 0,
  };
}

module.exports = { json_parse };
