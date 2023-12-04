import { timer, getSplittedDataFromFile, int10, sum } from '../utilities.ts';

timer.start();

const cards = getSplittedDataFromFile(4).map(v =>
  (v.split(':').pop() ?? '').split('|').map(v => v.split(' ').filter(Boolean).map(int10))
);

const matches = cards.reduce<Record<string, number>>(
  (acc, [card, results], i) => ({ ...acc, [i + 1]: card.reduce((c, v) => c + (results.includes(v) ? 1 : 0), 0) }),
  {}
);

const p1 = cards.reduce((acc, _, i) => acc + (matches[i + 1] > 0 ? Math.pow(2, matches[i + 1] - 1) : 0), 0);

const mem = new Map<number, number>();

const unfold = (i: number): number => {
  let tally = 1;

  for (let c = 1; c <= matches[i]; c++) {
    tally += mem.has(i + c) ? mem.get(i + c)! : unfold(i + c);
  }

  mem.set(i, tally);

  return tally;
};

console.log('p1', p1);
console.log('p2', sum(cards.map((_, i) => unfold(i + 1))));

timer.stop();
