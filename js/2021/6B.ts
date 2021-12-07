import { timer, getIntArrayFromFile, range, initMap, sum, int } from '../utilities.ts';

timer.start();

const data = getIntArrayFromFile(6, ',');

let count = data.reduce((c, f) => ({ ...c, [f]: c[f] + 1 }), initMap(range(0, 9), 0));

for (const _ in range(0, 256)) {
  count = Object.keys(count)
    .map(int)
    .reduce((updated, c) => {
      updated[c - 1 < 0 ? 6 : c - 1] += count[c];
      if (c - 1 < 0) updated[8] = count[c];
      return updated;
    }, initMap(range(0, 9), 0));
}
console.log(sum(Object.values(count)));

timer.stop();
