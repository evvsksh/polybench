function json_parse() {
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

  return sum;
}

module.exports = { json_parse };
