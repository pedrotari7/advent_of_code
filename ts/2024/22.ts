import { timer, getIntArrayFromFile } from '../utilities.ts';

timer.start();

const numbers = getIntArrayFromFile(22).map(BigInt);

const N = 2000;

const mix = (a: bigint, secret: bigint) => a ^ secret;
const prune = (a: bigint) => a % 16777216n;

const sequences = new Map<string, number>();

const evolve = (nums: bigint[]) => {
  const changes: bigint[][] = Array.from({ length: nums.length }, () => []);
  const seen = Array.from({ length: nums.length }, () => new Set<string>());
  const prev = nums.map(n => n % 10n);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < N; j++) {
      let n = nums[i];
      n = prune(mix(n << 6n, n));
      n = mix(n >> 5n, n);
      n = prune(mix(n << 11n, n));
      nums[i] = n;

      if (j > 3) {
        changes[i].shift();
      }
      const digit = nums[i] % 10n;
      changes[i].push(digit - prev[i]);
      if (changes[i].length === 4) {
        const key = changes[i].toString();
        if (!seen[i].has(key)) {
          seen[i].add(key);
          sequences.set(key, (sequences.get(key) ?? 0) + Number(digit));
        }
      }

      prev[i] = nums[i] % 10n;
    }
  }
  return nums;
};

console.log('p1', Number(evolve(numbers).reduce((acc, n) => acc + n, 0n)));
console.log('p2', [...sequences.entries()].toSorted((a, b) => a[1] - b[1]).pop()![1]);

timer.stop();
