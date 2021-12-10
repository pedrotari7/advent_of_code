import { timer, getCharMatrixFromFile, sortAsc } from '../utilities.ts';

timer.start();

const points: { [k: string]: number } = { ')': 1, ']': 2, '}': 3, '>': 4 };
const pair: { [k: string]: string } = { '(': ')', '[': ']', '{': '}', '<': '>' };

const data = getCharMatrixFromFile(10, '');

const matchPairs = (line: string[]) => {
  let clean: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (i + 1 < line.length && line[i + 1] === pair[line[i]]) {
      i += 2;
      continue;
    }

    clean.push(line[i]);
    i += 1;
  }

  if (clean.length > 0 && line.some((l, k) => l !== clean[k])) {
    clean = matchPairs(clean).l;
  }

  if (clean.every((l) => Object.keys(pair).includes(l))) return { valid: true, l: clean };
  return { valid: false, l: clean };
};

const validLines = [];

for (const line of data) {
  console.log(`line `, line.join(''));

  const clean = matchPairs(line);
  if (clean.valid) {
    validLines.push(clean.l);
    console.log(`valid`, clean.l.join(''));
  }
}

const missing = validLines.map((vl) => vl.reverse().map((c) => pair[c]));

console.log(
  `missing`,
  missing.map((m) => m.join(''))
);

const results = sortAsc(missing.map((l) => l.reduce((total, c) => 5 * total + points[c], 0)));

console.log(`result`, results[Math.floor(results.length / 2)]);

timer.stop();
