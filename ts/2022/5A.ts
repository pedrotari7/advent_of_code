import { timer, getSplittedDataFromFile, int10 } from '../utilities.ts';

timer.start();

const [stacksInfo, movesInfo] = getSplittedDataFromFile(5, '\n\n');

const moves = movesInfo
  .split('\n')
  .filter(Boolean)
  .map((m) =>
    m
      .match(/move (\d+) from (\d+) to (\d+)/)!
      .slice(1)
      .map(int10)
  );

const stacks = stacksInfo
  .split('\n')
  .slice(0, -1)
  .reverse()
  .reduce<string[][]>((stacks, row) => {
    for (let i = 1; i < row.length; i += 4) {
      const idx = (i - 1) / 4;
      if (!/[A-Z]+/.test(row[i])) continue;
      if (!stacks[idx]) stacks[idx] = [];
      stacks[idx].push(row[i]);
    }
    return stacks;
  }, []);

for (const [amt, src, dest] of moves) {
  stacks[dest - 1].push(...stacks[src - 1].splice(-amt).reverse());
}
console.log(stacks.map((s) => s.pop()).join(''));

timer.stop();
