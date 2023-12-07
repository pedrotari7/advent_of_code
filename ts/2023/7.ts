import { timer, getSplittedDataFromFile, int10, range, sumFun } from '../utilities.ts';

timer.start();

const strength = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].toReversed();
const alternativeStrength = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].toReversed();

const countChars = (s: string) =>
  s.split('').reduce((acc, c) => acc.set(c, (acc.get(c) ?? 0) + 1), new Map<string, number>());

const getType = (hand: string) => {
  const chars = countChars(hand);

  const values = [...chars.values()];
  if (values.some(v => v === 5)) return 7;
  if (values.some(v => v === 4)) return 6;
  if (values.some(v => v === 3)) {
    if (values.some(v => v === 2)) return 5;
    return 4;
  }
  if (values.filter(v => v === 2).length === 2) return 3;
  if (values.some(v => v === 2)) return 2;
  return 1;
};

const bestType = (hand: string) => {
  const chars = countChars(hand);

  const type = getType(hand);

  if (!chars.get('J')) return type;

  if (type === 1) return 2;
  if (type === 2) return 4;
  if (type === 3) {
    if (chars.get('J') === 1) return 5;
    if (chars.get('J') === 2) return 6;
  }
  if (type === 4) return 6;
  return 7;
};

const hands: [string, number, number, number][] = getSplittedDataFromFile(7)
  .map(s => s.split(' '))
  .map(c => [c[0], int10(c[1]), getType(c[0]), bestType(c[0])]);

const sortCards = (hA: (typeof hands)[0], hB: (typeof hands)[0], idx: 2 | 3) => {
  if (hA[idx] !== hB[idx]) return hA[idx] - hB[idx];
  const s = idx === 2 ? strength : alternativeStrength;
  for (const i of range(0, 5)) {
    const [cA, cB] = [hA[0][i], hB[0][i]];
    if (cA !== cB) return s.indexOf(cA) - s.indexOf(cB);
  }
  return 0;
};

const sortSimple = (a: (typeof hands)[0], b: (typeof hands)[0]) => sortCards(a, b, 2);
const sortJoker = (a: (typeof hands)[0], b: (typeof hands)[0]) => sortCards(a, b, 3);

const winnings = (arr: (typeof hands)[0], i: number) => arr[1] * (i + 1);

console.log('p1', sumFun(hands.toSorted(sortSimple), winnings));
console.log('p2', sumFun(hands.toSorted(sortJoker), winnings));

timer.stop();
