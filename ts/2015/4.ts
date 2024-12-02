import { getDataFromFile, md5, timer } from '../utilities.ts';

timer.start();

const key = getDataFromFile(4);

const zeros = (str: string, n: number) => str.startsWith('0'.repeat(n));

const find = (key: string, n: number) => {
  let i = 0;
  while (!zeros(md5(`${key}${i}`), n)) {
    i += 1;
  }

  return i;
};

console.log('p1', find(key, 5));
console.log('p2', find(key, 6));

timer.stop();
