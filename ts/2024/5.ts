import { timer, getSplittedDataFromFile, int10, equals, mid } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(5, '\n\n').map(x => x.split('\n'));

const rules = data[0].reduce((acc, pages) => {
  const [X, Y] = pages.split('|').map(int10);

  return acc.set(X, (acc.get(X) ?? new Set<number>()).add(Y));
}, new Map<number, Set<number>>());

const [p1, p2] = data[1]
  .map(x => x.split(',').map(int10))
  .reduce(
    ([p1, p2], update) => {
      const sorted = update.toSorted((a, b) => (rules.get(a)!.has(b) ? -1 : 1));
      return equals(sorted, update) ? [p1 + mid(update), p2] : [p1, p2 + mid(sorted)];
    },
    [0, 0]
  );

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
