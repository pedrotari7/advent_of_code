import { timer, getIntArrayFromFile, range, fill } from '../utilities.ts';

timer.start();

let data = getIntArrayFromFile(6, ',');
for (const _ in range(0, 80)) {
  data = data.map((f) => f - 1);
  const n = data.filter((f) => f === -1).length;
  data = [...data.map((f) => (f === -1 ? 6 : f)), ...fill(n, 8)];
}
console.log(data.length);

timer.stop();
