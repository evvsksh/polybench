const fs = require("fs");

const args = process.argv.slice(2);
const jsonIdx = args.indexOf("--json");

if (jsonIdx === -1 || !args[jsonIdx + 1]) {
  console.error("Error: Please provide JSON data using the --json flag.");
  process.exit(1);
}

let rawData;
try {
  rawData = JSON.parse(args[jsonIdx + 1]);
} catch (e) {
  console.error("Error: Invalid JSON string provided.");
  process.exit(1);
}

const benchNames = Object.keys(rawData[0].benchmarks);

const stats = {};

for (const bench of benchNames) {
  const times = [];
  const mems = [];

  for (const lang of rawData) {
    const b = lang.benchmarks[bench];
    if (b && b.success) {
      times.push(b.timeElapsedMs);
      mems.push(b.memDeltaKb);
    }
  }

  stats[bench] = {
    minTime: Math.min(...times),
    maxTime: Math.max(...times),
    minMem: Math.min(...mems),
    maxMem: Math.max(...mems),
  };
}

function normalize(min, max, value) {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

function formatScore(n) {
  if (!isFinite(n)) return "∞";
  return Number(n.toFixed(5)).toString();
}

const languages = rawData.map((langData) => {
  let total = 0;
  let count = 0;

  for (const benchName in langData.benchmarks) {
    const bench = langData.benchmarks[benchName];
    if (!bench.success) continue;

    const s = stats[benchName];

    const t = normalize(s.minTime, s.maxTime, bench.timeElapsedMs);
    const m = normalize(s.minMem, s.maxMem, bench.memDeltaKb);

    total += t * 0.7 + m * 0.3;
    count++;
  }

  return {
    name: langData.language,
    score: count ? total / count : Infinity,
  };
});

languages.sort((a, b) => a.score - b.score);

const width = 720;
const contentWidth = 520;
const centerX = width / 2;

const rowHeight = 54;
const headerHeight = 90;
const paddingTop = 40;

const height = headerHeight + languages.length * rowHeight + 60;

const maxScore = Math.max(...languages.map((l) => l.score));
const maxBar = 240;

let rows = "";

languages.forEach((lang, i) => {
  const y = headerHeight + i * rowHeight;

  const bar = maxScore ? (lang.score / maxScore) * maxBar : 0;

  const blockX = centerX - contentWidth / 2;

  rows += `
    <g transform="translate(${blockX}, ${y})">

      <text x="0" y="18" fill="#9ca3af" font-size="12" font-family="monospace" text-anchor="middle">
        ${String(i + 1).padStart(2, "0")}
      </text>

      <text x="70" y="18" fill="#e5e7eb" font-size="13" font-family="monospace" text-anchor="middle">
        ${lang.name}
      </text>

      <rect x="140" y="6" width="${maxBar}" height="10" fill="#111827"/>

      <rect x="140" y="6" width="${Math.max(bar, 2)}" height="10" fill="#60a5fa"/>

      <text x="${140 + maxBar + 40}" y="16" fill="#9ca3af" font-size="12" font-family="monospace" text-anchor="middle">
        ${formatScore(lang.score)}
      </text>

    </g>
  `;
});

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="#0b0f14"/>

  ${rows}

</svg>
`;

fs.writeFileSync("leaderboard.svg", svg);
