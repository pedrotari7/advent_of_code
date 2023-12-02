import { mult } from '../../js/utilities.js';
import { timer, getSplittedDataFromFile } from '../utilities.ts';

timer.start();

const goal = { red: 12, green: 13, blue: 14 };

type Colors = {
  red: number;
  green: number;
  blue: number;
};

const games = getSplittedDataFromFile(2).map(game =>
  (game.split(':').at(-1) ?? '').split(';').map(v =>
    v
      .split(',')
      .map(s => s.trim().split(' '))
      .reduce((acc, [value, color]) => ({ ...acc, [color]: parseInt(value) }), {} as Colors)
  )
);

const p1 = games.reduce(
  (score, game, i) =>
    game.every(round => !(round.red > goal.red || round.green > goal.green || round.blue > goal.blue))
      ? score + i + 1
      : score,
  0
);

const p2 = games.reduce(
  (score, game) =>
    score +
    mult(
      Object.values(
        game.reduce(
          (acc, round) => ({
            red: round.red ? Math.max(acc.red, round.red) : acc.red,
            green: round.green ? Math.max(acc.green, round.green) : acc.green,
            blue: round.blue ? Math.max(acc.blue, round.blue) : acc.blue,
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
