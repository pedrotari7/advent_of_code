import { timer, getSplittedDataFromFile, int10, range, mult, sortDesc } from '../utilities.ts';

timer.start();

let mod = 1;

const gn = (s: string) => int10(s.match(/\d+/)?.pop()!);

const monkeysP1 = getSplittedDataFromFile(11, '\n\n').map(info => {
  const lines = info.split('\n');
  const cond = gn(lines[3]);

  mod *= cond;
  return {
    items: [...lines[1].matchAll(/\d+/g)].flatMap(v => int10(v.pop()!)),
    op: (old: number) => eval(lines[2].split('=')[1].trim()),
    test: (v: number) => (v % cond === 0 ? gn(lines[4]) : gn(lines[5])),
    c: 0,
  };
});
const monkeysP2 = monkeysP1.map(m => ({ ...m, items: [...m.items] }));

const inspect = (monkeys: typeof monkeysP1, n: number, stress: (n: number) => number) => {
  for (const _ of range(n)) {
    for (const [i, m] of monkeys.entries()) {
      monkeys[i].c += m.items.length;
      while (m.items.length) {
        const red = stress(m.op(m.items.pop()!)) % mod;
        monkeys[m.test(red)].items.push(red);
      }
    }
  }
};

const business = (monkeys: typeof monkeysP1) => mult(sortDesc(monkeys.map(({ c }) => c)).slice(0, 2));

inspect(monkeysP1, 20, (n: number) => Math.floor(n / 3));
console.log('p1', business(monkeysP1));

inspect(monkeysP2, 10000, (n: number) => n);
console.log('p2', business(monkeysP2));

timer.stop();
