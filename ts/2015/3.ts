import { getSplittedDataFromFile, MapS, timer } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(3, '');

const moves: Record<string, number[]> = { '^': [0, -1], '>': [1, 0], v: [0, 1], '<': [-1, 0] };

let pos = [0, 0];

const houses = new MapS([[pos, 1]]);

const move = (dir: string) => {
  pos = [pos[0] + moves[dir][0], pos[1] + moves[dir][1]];
  return pos;
};

const visit = (p: number[]) => (houses.has(p) ? houses.set(p, houses.get(p)! + 1) : houses.set(p, 1));

data.forEach(dir => visit(move(dir)));

console.log('p1', houses.size);

let posA = [0, 0];
let posB = [0, 0];

let turn = true;

const houses2 = new MapS([[[0, 0], 1]]);

const move2 = (dir: string) => {
  const pos = turn ? posA : posB;
  const new_pos = [pos[0] + moves[dir][0], pos[1] + moves[dir][1]];

  posA = turn ? new_pos : posA;
  posB = turn ? posB : new_pos;

  return new_pos;
};

const visit2 = (p: number[]) => {
  houses2.has(p) ? houses2.set(p, houses2.get(p)! + 1) : houses2.set(p, 1);
  turn = !turn;
};

data.forEach(dir => visit2(move2(dir)));

console.log('p2', houses2.size);

timer.stop();
