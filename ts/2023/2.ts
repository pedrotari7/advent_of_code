import { timer, getSplittedDataFromFile, mult, int10 } from '../utilities.ts';

timer.start();

const goal = { red: 12, green: 13, blue: 14 };

type Colors = { red: number; green: number; blue: number };

const games = getSplittedDataFromFile(2).map(game =>
  (game.split(':').at(-1) ?? '').split(';').map(v =>
    v
      .split(',')
      .map(s => s.trim().split(' '))
      .reduce<Colors>((acc, [value, color]) => ({ ...acc, [color]: int10(value) }), { red: 0, green: 0, blue: 0 })
  )
);

const isValid = (round: Colors) => round.red <= goal.red && round.green <= goal.green && round.blue <= goal.blue;

const p1 = games.reduce((score, game, i) => (game.every(isValid) ? score + i + 1 : score), 0);

const p2 = games.reduce(
  (score, game) =>
    score +
    mult(
      Object.values(
        game.reduce(
          (acc, round) => ({
            red: Math.max(acc.red, round.red),
            green: Math.max(acc.green, round.green),
            blue: Math.max(acc.blue, round.blue),
          }),
          { red: 0, green: 0, blue: 0 }
        )
      )
    ),
  0
);

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
