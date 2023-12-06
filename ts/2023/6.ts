import { timer, getSplittedDataFromFile, mult, int10 } from '../utilities.ts';

timer.start();

const [times, dists] = getSplittedDataFromFile(6).map(s => s.split(':').pop()!.split(' ').filter(Boolean).map(int10));

const isWin = (time: number, distance: number, speed: number) => (time - speed) * speed > distance;

const getWins = (time: number, distance: number) => {
  let minspeed = 1;
  let maxspeed = time - 1;

  while (minspeed < maxspeed) {
    const minWin = isWin(time, distance, minspeed);
    const maxWin = isWin(time, distance, maxspeed);

    if (minWin && maxWin) break;
    if (!minWin) minspeed++;
    if (!maxWin) maxspeed--;
  }

  return maxspeed - minspeed + 1;
};

const count = (times: number[], distances: number[]) => {
  const ways: number[] = [];
  for (let i = 0; i < times.length; i++) {
    ways.push(getWins(times[i], distances[i]));
  }
  return ways;
};

console.log('p1', mult(count(times, dists)));
console.log('p2', getWins(int10(times.join('')), int10(dists.join(''))));

timer.stop();
