import { timer, getSplittedDataFromFile, int, sum } from '../utilities.ts';

timer.start();

let [p1, p2] = getSplittedDataFromFile(21).map((s) => int(s.split(' ').pop()!));

let [s1, s2] = [0, 0];

let d = 1;

const mod = (n: number, l: number) => ((n - 1) % l) + 1;

const getD = (d: number) => sum([d, d + 1, d + 2]);

let rolls = 0;

const play = (p: number) => {
  const np = mod(p + getD(d), 10);
  rolls += 3;
  d += 3;
  return np;
};

while (s1 < 1000 && s2 < 1000) {
  p1 = play(p1);
  s1 += p1;

  if (s1 >= 1000) break;
  p2 = play(p2);
  s2 += p2;
}

console.log(rolls * Math.min(s1, s2));

timer.stop();
