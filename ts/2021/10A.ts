import { timer, getCharMatrixFromFile, min } from '../utilities.ts';

timer.start();

const points: { [k: string]: number } = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const pair: { [k: string]: string } = { '(': ')', '[': ']', '{': '}', '<': '>' };

const data = getCharMatrixFromFile(10, '');

let result = 0;

const matchPairs = (line: string[]): string[] => {
  let clean: string[] = [];
  let i = 0;
  while (line.length > 0 && i < line.length) {
    if (line[i + 1] === pair[line[i]]) {
      i += 2;
      continue;
    }

    clean.push(line[i]);
    i++;
  }
  if (clean.length > 0 && line.some((l, k) => l !== clean[k])) {
    clean = matchPairs(clean);
  }

  return clean.every(l => Object.keys(pair).includes(l)) ? [] : clean;
};

for (const line of data) {
  const clean = matchPairs(line).join('');

  if (clean.length) {
    result +=
      points[
        clean[
          min(
            Object.keys(points)
              .map(w => clean.indexOf(w))
              .filter(c => c >= 0)
          )
        ]
      ];
  }
}

console.log(result);

timer.stop();
