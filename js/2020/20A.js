
const { timer, getDataFromFile, bin, reverse, int, mult } = require('../utilities');

timer.start();

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

const borders = Object.entries(data).reduce((acc, [id, bs]) => {
    for (const b of bs) {
        if (acc[b]) acc[b].add(id);
        else acc[b] = new Set([id]);
    }
    return acc;
}, {});


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

const corners = new Set(Object.entries(p)
    .filter(([_, c]) => c === 2).map(([id, _]) => int(id.split('-')[0])))

console.log('corners', mult([...corners]))

timer.stop();
