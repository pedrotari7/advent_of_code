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

const p1Stacks = stacksInfo
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

const p2Stacks = [...p1Stacks.map((r) => [...r])];

for (const [amt, src, dest] of moves) {
  p1Stacks[dest - 1].push(...p1Stacks[src - 1].splice(-amt).reverse());
  p2Stacks[dest - 1].push(...p2Stacks[src - 1].splice(-amt));
}
console.log('p1', p1Stacks.map((s) => s.pop()).join(''));
console.log('p2', p2Stacks.map((s) => s.pop()).join(''));

timer.stop();
