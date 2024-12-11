import { fill, getIntArrayFromFile } from '../utilities.ts';
import { timer } from '../utilities.ts';

timer.start();

const disk = getIntArrayFromFile(9, '').reduce<number[]>(
  (disk, size, id) => disk.concat(...fill(size, id % 2 !== 0 ? -1 : id / 2)),
  []
);

const arrange = (disk: number[]) => {
  const d = [...disk];

  let head = 0;
  let tail = d.length - 1;

  while (head < tail) {
    if (d[head] !== -1) {
      head++;
      continue;
    }

    while (d[tail] === -1) {
      tail--;
    }

    if (tail < head) break;

    d[head] = d[tail];
    d[tail] = -1;
    head++;
  }
  return d;
};

const arrange2 = (disk: number[]) => {
  const d = [...disk];

  let tail = d.length - 1;

  while (tail >= 0) {
    while (d[tail] === -1) {
      tail--;
    }

    let tailSize = tail;

    while (d[tailSize] === d[tail]) {
      tailSize--;
    }

    const size = tail - tailSize;

    let head = 0;
    while (head < tailSize) {
      if (d[head] !== -1) {
        head++;
        continue;
      }

      let gap = 0;
      while (d[head + gap] === -1 && gap < size) {
        gap++;
      }

      if (gap === size) {
        d.fill(d[tail], head, head + size);
        d.fill(-1, tailSize + 1, tail + 1);
        break;
      }

      head += gap;
    }
    tail = tailSize;
  }

  return d;
};

const checkSum = (d: number[]) => d.reduce((acc, p, idx) => acc + (p > 0 ? p * idx : 0), 0);

console.log('p1', checkSum(arrange(disk)));
console.log('p2', checkSum(arrange2(disk)));

timer.stop();
