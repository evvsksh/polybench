const { performance } = require("perf_hooks");

const { prime_sieve } = require("./jobs/prime_sieve");
const { json_parse } = require("./jobs/json_parse");
const { matrix_mul } = require("./jobs/matrix_mul");

function runBench(fn) {
  const startMem = process.memoryUsage().rss;

  const start = performance.now();

  let error = null;
  let success = false;

  try {
    fn();
    success = true;
  } catch (e) {
    error = String(e);
  }

  const end = performance.now();
  const endMem = process.memoryUsage().rss;

  const cpu = process.cpuUsage();

  const result = {
    success,
    timeElapsedMs: end - start,
    memDeltaKb: (endMem - startMem) / 1024,
    cpuUserMs: cpu.user / 1000,
    cpuSystemMs: cpu.system / 1000,
  };

  if (error) result.error = error;

  return result;
}

function main() {
  const results = {
    language: "javascript",
    benchmarks: {
      prime_sieve: runBench(prime_sieve),
      json_parse: runBench(json_parse),
      matrix_mul: runBench(matrix_mul),
    },
  };

  console.log(JSON.stringify(results));
}

main();
