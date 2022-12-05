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

  return { valid: clean.every(l => Object.keys(pair).includes(l)), l: clean };
};

const validLines = data.reduce((vl, l) => {
  const clean = matchPairs(l);
  return clean.valid ? [...vl, clean.l] : vl;
}, [] as string[][]);

const missing = validLines.map(vl => vl.reverse().map(c => pair[c]));

const results = sortAsc(missing.map(l => l.reduce((total, c) => 5 * total + points[c], 0)));

console.log(results[Math.floor(results.length / 2)]);

timer.stop();
