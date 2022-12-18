import { timer, getIntMatrixFromFile, inRange } from '../utilities.ts';

timer.start();

type N = number;
class Array3D {
  public min = Infinity;
  public max = -Infinity;

  private elements = new Set<string>();
  add = (x: N, y: N, z: N) => {
    this.min = Math.min(this.min, x, y, z);
    this.max = Math.max(this.max, x, y, z);
    this.elements.add([x, y, z].toString());
    return this;
  };

  has = (x: N, y: N, z: N) => this.elements.has([x, y, z].toString());

  area = (x: N, y: N, z: N) =>
    +!lava.has(x + 1, y, z) +
    +!lava.has(x - 1, y, z) +
    +!lava.has(x, y + 1, z) +
    +!lava.has(x, y - 1, z) +
    +!lava.has(x, y, z + 1) +
    +!lava.has(x, y, z - 1);
}

const cubes = getIntMatrixFromFile(18, ',');

const lava = cubes.reduce((lava, [x, y, z]) => lava.add(x, y, z), new Array3D());

const p1 = cubes.reduce((c, [x, y, z]) => c + lava.area(x, y, z), 0);

const visited = new Set();

let p2 = 0;
const Q = [[lava.min - 1, lava.min - 1, lava.min - 1]];

while (Q.length) {
  const [x, y, z] = Q.shift()!;
  if (visited.has(`${x},${y},${z}`) || lava.has(x, y, z)) continue;
  if (
    !inRange(x, lava.min - 1, lava.max + 1) ||
    !inRange(y, lava.min - 1, lava.max + 1) ||
    !inRange(z, lava.min - 1, lava.max + 1)
  )
    continue;
  visited.add(`${x},${y},${z}`);

  p2 += 6 - lava.area(x, y, z);

  Q.push([x + 1, y, z], [x - 1, y, z], [x, y + 1, z], [x, y - 1, z], [x, y, z + 1], [x, y, z - 1]);
}

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
