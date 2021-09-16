
const { timer, getDataFromFile, bin, reverse, int, mult, range, deepCopy } = require('../utilities');

timer.start();

let N;

const dp = (image, poss, [x, y]) => {
    console.log('x,y,poss', x, y, poss)

    if (y === N) return image;

    for (const p of poss) {
        console.log('p', p)
        const newImage = deepCopy(image);
        newImage[y][x] = p;

        let newPoss;
        let newX = x;
        let newY = y;
        if (newX === N - 1) {
            newX = 0;
            newY++;
            if (data[p]) {
                newPoss = borders[data[p][1]]
            } else {
                continue
            }
        } else {
            newX++;
            console.log('newImage[newY][newX]', newImage[newY][newX], data[p])
            if (data[p]) {
                newPoss = borders[data[p][3]]
            } else {
                continue
            }

        }

        const final = dp(newImage, [...newPoss], [newX, newY])
        if (final) {
            return final;
        }
    }

    return false;

}

const rotateX = a => [reverse(a[0]), reverse(a[1]), a[3], a[2]];

const rotateY = a => [a[1], a[0], reverse(a[2]), reverse(a[3])];

const toInt = n => n.map(b => bin(b.split('').map(c => c === '#' ? '1' : '0').join('')));

const pixels = (a) => {
    const active = [];

    a = a.split('\n').filter(Boolean);

    const rightBorder = [];
    const leftBorder = [];

    for (let y = 0; y < a.length; y++) {
        if (y === 0 || y === (a.length - 1)) active.push(a[y]);

        for (let x = 0; x < a[y].length; x++) {
            if (x === 0) leftBorder.push(a[y][x]);
            if (x === (a[y].length - 1)) rightBorder.push(a[y][x]);
        }
    }

    N = leftBorder.length;

    active.push(leftBorder.join(''), rightBorder.join(''))

    return [
        toInt(active),
        toInt(rotateX(active)),
        toInt(rotateY((active))),
        toInt(rotateX(rotateY((active))))
    ];
}

const data = [...getDataFromFile(20)
    .matchAll(/(\d+):\n([#\.\n]+)/gm)]
    .reduce((acc, d) => {
        const p = pixels(d[2]);
        for (let i = 0; i < p.length; i++) {
            acc[`${d[1]}-${i}`] = p[i];
        }
        return acc;
    }, {});

console.log('data', data)

const borders = Object.entries(data).reduce((acc, [id, bs]) => {
    for (const b of bs) {
        if (acc[b]) acc[b].add(id);
        else acc[b] = new Set([id]);
    }
    return acc;
}, {});

console.log('borders', borders)

const pairs = Object.entries(borders)
    .filter(([_, a]) => (new Set([...a].map(b => b.split('-')[0]))).size !== 1)
    .map(a => [...a[1]]);

const p = pairs.reduce((acc, v) => {
    for (const b of v) {
        if (acc[b]) acc[b]++;
        else acc[b] = 1;
    }
    return acc;
}, {})

console.log('pairs', pairs)

const corners = Object.entries(p)
    .filter(([_, c]) => c === 2).map(([id, _]) => id)

const edges = new Set(Object.entries(p)
    .filter(([_, c]) => c === 3).map(([id, _]) => int(id.split('-')[0])))

const centers = new Set(Object.entries(p)
    .filter(([_, c]) => c === 4).map(([id, _]) => int(id.split('-')[0])))

const tiles = range(0, N).map(_ => range(0, N).map(_ => ''));

console.log('edges', edges)
console.log('corners', corners)
console.log('centers', centers)

const final = dp(tiles, [...corners], [0, 0])

console.log('final', final)

timer.stop();