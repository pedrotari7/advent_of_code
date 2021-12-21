import { bin, getCharMatrixFromFile, perm, range, sum, timer } from '../utilities.ts';

timer.start();

let [iea, _, ...img] = getCharMatrixFromFile(20, '');

const dir = perm(range(-1, 2), 2);

const neigh = (r: number, c: number, img: string[][]) => dir.map((d) => img[r + d[0]]?.[c + d[1]]);

const apply = (img: string[][], chr = '.') =>
  range(-1, img.length + 1).map((r) =>
    range(-1, img.length + 1).map((c) => iea[bin(neigh(r, c, img).map((d) => (d ? +(d === '#') : +(chr === '#'))))])
  );

let c = '.';

for (const i of range(0, 50)) {
  img = apply(img, c);
  c = [iea[0], iea[iea.length - 1]][i % 2];
  if (i === 1 || i === 49) console.log(sum(img.map((line) => sum(line.map((d) => +(d === '#'))))));
}

timer.stop();
