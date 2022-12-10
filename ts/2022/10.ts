import { timer, int10, getCharMatrixFromFile, fill2D } from '../utilities.ts';

timer.start();

let cycles = 1;
let x = 1;
let p1 = 0;

const screen = fill2D(6, 40, ' ');

const print_screen = () => {
  for (const line of screen) {
    console.log(line.join(''));
  }
  console.log();
};

const measure = (c: number, x: number) => {
  if (c === 20 || c === 60 || c === 100 || c === 140 || c === 180 || c === 220) {
    p1 += c * x;
  }
  const h = (c - 1) % 40;
  const v = Math.floor((c - 1) / 40);
  if (h === x - 1 || h === x || h === x + 1) screen[v][h] = '#';
};

for (const inst of getCharMatrixFromFile(10, ' ')) {
  measure(cycles, x);
  if (inst[0] === 'addx') {
    cycles++;
    measure(cycles, x);
    x += int10(inst[1]);
  }
  cycles++;
}

print_screen();

console.log('p1', p1);
console.log('p2', 'PLPAFBCL');
timer.stop();
