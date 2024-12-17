import { timer, nums, getDataFromFile } from '../utilities.ts';

timer.start();

const [A, B, C, ...program] = nums(getDataFromFile(17));

const instructions: Record<number, string> = {
  0: 'adv',
  1: 'bxl',
  2: 'bst',
  3: 'jnz',
  4: 'bxc',
  5: 'out',
  6: 'bdv',
  7: 'cdv',
};

const run = ([A, B, C]: number[]) => {
  let i = 0;

  const out = [];

  while (i < program.length) {
    const opName = instructions[program[i]];
    const literal = program[i + 1];
    const combo = () => (literal <= 3 ? literal : [A, B, C][literal - 4]);

    if (opName === 'adv') A = A >>> combo();
    else if (opName === 'bxl') B = B ^ literal;
    else if (opName === 'bst') B = combo() % 8;
    else if (opName === 'bxc') B = B ^ C;
    else if (opName === 'out') out.push(combo() % 8);
    else if (opName === 'bdv') B = A >>> combo();
    else if (opName === 'cdv') C = A >>> combo();
    else if (opName === 'jnz')
      if (A !== 0) {
        i = literal;
        continue;
      }
    i += 2;
  }
  return out;
};

const findA = (nextA: number, i: number): number => {
  if (i < 0) return nextA;
  for (let regA = nextA * 8; regA < nextA * 8 + 8; regA++) {
    const out = run([regA, B, C]);
    if (out[0] === program[i]) {
      const finalVal = findA(regA, i - 1);
      if (finalVal >= 0) return finalVal;
    }
  }
  return -1;
};

console.log('p1', run([A, B, C]).join(','));
console.log('p2', findA(0, program.length - 1));

timer.stop();
