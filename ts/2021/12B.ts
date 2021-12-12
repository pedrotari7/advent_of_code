import { timer, getCharMatrixFromFile } from '../utilities.ts';

timer.start();

const map = getCharMatrixFromFile(12, '-').reduce((m, c) => {
  if (!m[c[0]]) m[c[0]] = [];
  if (!m[c[1]]) m[c[1]] = [];

  if (c[1] !== 'end' && c[0] !== 'start') m[c[1]].push(c[0]);
  if (c[0] !== 'end' && c[1] !== 'start') m[c[0]].push(c[1]);

  return m;
}, {} as Record<string, string[]>);

const isSmall = (c: string) => c.toLowerCase() === c;

const occurrences = (a: string[]) =>
  a
    .filter((c) => isSmall(c) && c !== 'start' && c !== 'end')
    .reduce((acc, curr) => (acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc), {} as Record<string, number>);

const isRepeated = (a: string[]) => Object.values(occurrences(a)).some((v) => v >= 2);

const q = [{ cave: 'start', path: [] as string[] }];

const paths: string[][] = [];

while (q.length) {
  const { cave, path } = q.shift()!;

  const newPath = [...path, cave];

  if (cave === 'end') {
    paths.push(newPath);
    continue;
  }

  const hasRepeated = isRepeated(newPath);

  for (const c of map[cave]) {
    if (c === 'end' || !isSmall(c) || !newPath.includes(c) || (isSmall(c) && !hasRepeated))
      q.push({ cave: c, path: newPath });
  }
}
console.log(paths.length);

timer.stop();
