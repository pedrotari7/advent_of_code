import { timer, getCharMatrixFromFile } from '../utilities.ts';

timer.start();

const map = getCharMatrixFromFile(12, '-').reduce((m, c) => {
  if (!m[c[0]]) m[c[0]] = [];
  if (!m[c[1]]) m[c[1]] = [];

  m[c[1]].push(c[0]);
  m[c[0]].push(c[1]);

  return m;
}, {} as Record<string, string[]>);

const isSmall = (c: string) => c.toLowerCase() === c;

const q = [{ cave: 'start', path: [] as string[] }];

const paths: string[][] = [];

while (q.length) {
  const { cave, path: p } = q.pop()!;

  const path = [...p, cave];

  path.push(cave);

  if (cave === 'end') {
    paths.push(path);
    continue;
  }

  for (const c of map[cave]) {
    if (!isSmall(c) || !path.includes(c)) q.push({ cave: c, path });
  }
}

console.log(paths.length);

timer.stop();
