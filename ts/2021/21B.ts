import { timer, getSplittedDataFromFile, int, max, perm } from '../utilities.ts';

timer.start();

type N = number;

const [p1, p2] = getSplittedDataFromFile(21).map((s) => int(s.split(' ').pop()!));

const mod = (n: N, l: N) => ((n - 1) % l) + 1;

const DP = new Map<string, N[]>();

const P = perm([1, 2, 3], 3);

const count = (p1: N, p2: N, s1: N, s2: N): N[] => {
  if (s1 >= 21) return [1, 0];
  if (s2 >= 21) return [0, 1];
  const s = [p1, p2, s1, s2].toString();
  if (DP.has(s)) return DP.get(s)!;

  const ans = P.reduce(
    ([w1, w2], [d1, d2, d3]) => {
      const newP1 = mod(p1 + d1 + d2 + d3, 10);
      const [x1, y1] = count(p2, newP1, s2, s1 + newP1);
      return [w1 + y1, w2 + x1];
    },
    [0, 0]
  );

  DP.set(s, ans);
  return ans;
};

console.log(max(count(p1, p2, 0, 0)));

timer.stop();
