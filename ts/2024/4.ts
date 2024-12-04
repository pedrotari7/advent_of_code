import { timer, getCharMatrixFromFile, dirs, equals, isInBounds } from '../utilities.ts';

timer.start();

const data = getCharMatrixFromFile(4, '');

let p1 = 0;
let p2 = 0;

const WORD = 'XMAS';

const getCross = (a: string[][], i: number, j: number) => [
  a[i - 1][j - 1],
  a[i - 1][j + 1],
  a[i + 1][j - 1],
  a[i + 1][j + 1],
];

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === WORD[0]) {
      for (const [dx, dy] of Object.values(dirs)) {
        let k = 1;
        let found = true;
        let y = i;
        let x = j;

        while (k < WORD.length && found) {
          x += dx;
          y += dy;
          if (!isInBounds(data, y, x) || data[y][x] !== WORD[k]) {
            found = false;
          }
          k++;
        }

        p1 += +found;
      }
    } else if (data[i][j] === 'A' && isInBounds(data, i + 1, j + 1) && isInBounds(data, i - 1, j - 1)) {
      const cross = getCross(data, i, j);
      p2 += +(
        equals(cross, ['M', 'S', 'M', 'S']) ||
        equals(cross, ['S', 'M', 'S', 'M']) ||
        equals(cross, ['S', 'S', 'M', 'M']) ||
        equals(cross, ['M', 'M', 'S', 'S'])
      );
    }
  }
}

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
