import { timer, getIntMatrixFromFile, int10 } from '../utilities.ts';

timer.start();

class Array3D {
  private elements: Record<number, Record<number, Set<number>>> = {};
  add = (x: number, y: number, z: number) => {
    this.elements = {
      ...this.elements,
      [x]: { ...this.elements[x], [y]: ((this.elements[x] ?? {})[y] ?? new Set()).add(z) },
    };
    return this;
  };

  has = (x: number, y: number, z: number) =>
    Object.keys(this.elements).includes(`${x}`) &&
    Object.keys(this.elements[x]).includes(`${y}`) &&
    this.elements[x][y].has(z);
}

const cubes = getIntMatrixFromFile(18, ',');

const lava = cubes.reduce((lava, [x, y, z]) => lava.add(x, y, z), new Array3D());

console.log('cubes', cubes);

console.log('lava', lava);

let p1 = 0;

for (const [x, y, z] of cubes) {
  console.log('p1,x,y,z', p1, x, y, z);

  console.log(
    lava.has(x + 1, y, x),
    lava.has(x - 1, y, z),
    lava.has(x, y + 1, z),
    lava.has(x, y - 1, z),
    lava.has(x, y, z + 1),
    lava.has(x, y, z - 1)
  );
  p1 +=
    +!lava.has(x + 1, y, x) +
    +!lava.has(x - 1, y, z) +
    +!lava.has(x, y + 1, z) +
    +!lava.has(x, y - 1, z) +
    +!lava.has(x, y, z + 1) +
    +!lava.has(x, y, z - 1);
}

const p2 = null;

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
