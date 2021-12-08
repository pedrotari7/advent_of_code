import { timer, getMatrixFromFile, int, sum, sortStr } from '../utilities.ts';

timer.start();

const normal = { abcefg: 0, cf: 1, acdeg: 2, acdfg: 3, bcdf: 4, abdfg: 5, abdefg: 6, acf: 7, abcdefg: 8, abcdfg: 9 };

const data = getMatrixFromFile(8, '|', (m) => m.split(' '));

const difference = <T>(a: T[], b: T[]) => a.filter((x) => !b.includes(x))[0];
const intersection = <T>(a: T[], b: T[]) => a.filter((x) => b.includes(x))[0];

const numbers = data.map(([pattern, number]) => {
  const p = pattern.reduce((c, a) => {
    const [len, p] = [a.length, a.split('').sort()];
    return { ...c, [len]: !c[len] ? [p] : [...c[len], p] };
  }, {} as Record<number, string[][]>);

  const tr: Record<string, string> = {};

  const [n1, n4, n7, n8] = [p[2][0], p[4][0], p[3][0], p[7][0]];

  tr['a'] = difference(n7, n1);
  const cde = [difference(n8, p[6][0]), difference(n8, p[6][1]), difference(n8, p[6][2])];
  tr['c'] = intersection(n1, cde);
  tr['f'] = difference(n1, [tr['c']]);
  const de = cde.filter((x) => x !== tr['c']);
  tr['d'] = intersection(n4, de);
  tr['e'] = difference(de, [tr['d']]);
  tr['b'] = difference(n4, [tr['d'], tr['c'], tr['f']]);
  tr['g'] = difference(n8, Object.values(tr));

  const newNormal = Object.entries(normal).reduce(
    (norm, [key, value]) => ({ ...norm, [sortStr(key, (k) => tr[k])]: value }),
    {} as Record<string, number>
  );

  return int(number.map((n) => newNormal[sortStr(n)]).join(''));
});

console.log(sum(numbers));

timer.stop();
