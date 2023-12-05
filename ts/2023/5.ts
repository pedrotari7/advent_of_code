import { timer, getSplittedDataFromFile, int10, min, pairs } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(5, '\n\n');

const seeds = data[0].match(/(\d+)/g)?.map(int10) ?? [];

const almanac = data.slice(1).reduce((acc, c) => {
  const [title, ...rest] = c.split('\n');
  const m = [...title.matchAll(/(\w+)-to-(\w+)/g)][0].splice(1);
  return acc.set(
    m,
    rest.map(v => v.split(' ').filter(Boolean).map(int10)).toSorted((a, b) => a[0] - b[0])
  );
}, new Map<string[], number[][]>());

const almanacKeys = [...almanac.keys()];

const fromCategories = almanacKeys.reduce<Record<string, string[]>>((acc, m) => ({ ...acc, [m[0]]: m }), {});
const toCategories = almanacKeys.reduce<Record<string, string[]>>((acc, m) => ({ ...acc, [m[1]]: m }), {});

const findLocation = (n: number, category: string): number => {
  if (category === 'location') return n;

  const nextMap = fromCategories[category];
  const ranges = almanac.get(nextMap)!;

  for (const range of ranges) {
    if (n >= range[1] && n < range[1] + range[2]) {
      return findLocation(range[0] + (n - range[1]), nextMap[1]);
    }
  }
  return findLocation(n, nextMap[1]);
};

const findSeed = (n: number, category: string): number => {
  if (category === 'seed') return n;

  const nextMap = toCategories[category];

  const ranges = almanac.get(nextMap)!;

  for (const range of ranges) {
    if (n < range[0]) break;
    if (n >= range[0] && n < range[0] + range[2]) {
      return findSeed(range[1] + (n - range[0]), nextMap[0]);
    }
  }
  return findSeed(n, nextMap[0]);
};

const p1 = min(seeds.map(seed => findLocation(seed, 'seed')));

let p2 = 0;

const seedRanges = pairs(seeds).toSorted((a, b) => a[0] - b[0]);

const isSeedValid = (seed: number) => {
  for (const [start, length] of seedRanges) {
    if (seed < start) return false;
    if (seed >= start && seed < start + length) {
      return true;
    }
  }
  return false;
};

while (1) {
  if (isSeedValid(findSeed(p2, 'location'))) {
    break;
  }
  p2++;
}

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
