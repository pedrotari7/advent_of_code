import { timer, getCharMatrixFromFile, int10, range } from '../utilities.ts';

timer.start();

const moves = getCharMatrixFromFile(9, ' ');

const M: Record<string, [number, number]> = { U: [0, 1], D: [0, -1], L: [-1, 0], R: [1, 0] };

const areAdjacent = (a: number[], b: number[]) => Math.abs(a[0] - b[0]) < 2 && Math.abs(a[1] - b[1]) < 2;

const heads = range(0, 10).map(() => [0, 0]);

const visited = range(0, 10).map(() => [[0, 0]]);

const move = (d: string[], v: number[]) => d.reduce((tail, m) => [M[m][0] + tail[0], M[m][1] + tail[1]], v);

for (const [dir, n] of moves) {
  for (let i = 0; i < int10(n); i++) {
    for (let k = 0; k < heads.length - 1; k++) {
      let [head, tail] = heads.slice(k, k + 2);

      if (k === 0) {
        head = move([dir], head);
      }

      if (!areAdjacent(head, tail)) {
        const v = tail[1] > head[1] ? 'D' : 'U';
        const h = tail[0] > head[0] ? 'L' : 'R';

        const m = tail[0] === head[0] ? [v] : tail[1] === head[1] ? [h] : [v, h];

        tail = move(m, tail);
        visited[k + 1].push(tail);
      }
      heads[k] = head;
      heads[k + 1] = tail;
    }
  }
}

const count = visited.map(v => new Set(v.map(a => String(a))).size);

console.log('p1', count[1]);
console.log('p2', count[9]);

timer.stop();
