import { timer, getSplittedDataFromFile, max, min, range } from '../utilities.ts';

timer.start();

const [temp, r] = getSplittedDataFromFile(14, '\n\n');

const add = (a: number, b: number) => (a || 0) + (b || 0);

const count = (pairs: Record<string, number>) => {
  const ch = Object.entries(pairs).reduce((ch, [pair, cnt]) => {
    if (!(pair[0] in ch)) ch[pair[0]] = 0;
    if (!(pair[1] in ch)) ch[pair[1]] = 0;

    ch[pair[0]] += cnt;
    ch[pair[1]] += cnt;

    return ch;
  }, {} as Record<string, number>);

  const n = Object.values(ch).map((c) => Math.ceil(c / 2));
  return max(n) - min(n);
};

const rules = r
  .split('\n')
  .map((d) => d.split(' -> '))
  .reduce((rul, [a, c]) => ({ ...rul, [a]: c }), {} as Record<string, string>);

let pairs = range(1, temp.length)
  .map((i) => temp[i - 1] + temp[i])
  .reduce((pairs, pair) => ({ ...pairs, [pair]: add(pairs[pair], 1) }), {} as Record<string, number>);

for (let step = 0; step < 40; step++) {
  if (step === 10) {
    console.log(count(pairs));
  }

  pairs = Object.keys(pairs)
    .flatMap((p) => [
      [p[0] + rules[p], pairs[p]],
      [rules[p] + p[1], pairs[p]],
    ])
    .reduce((np, [p, c]) => ({ ...np, [p]: add(np[p], c as number) }), {} as Record<string, number>);
}

console.log(count(pairs));

timer.stop();
