const { getDataFromFile, timer, int, sum, inRange } = require('../utilities');

timer.start();

const info = getDataFromFile(16);

const ranges = [...info.matchAll(/(\d+)-(\d+)/gm)].map(g => [int(g[1]), int(g[2])]);

const [_, ...tickets] = [...info.matchAll(/[0-9]+(,[0-9]+)*/gm)]
    .map(t => t[0])
    .filter(t => t.includes(','))
    .flatMap(t => t.split(',').map(int));

console.log(tickets.reduce((invalid, t) => invalid + (ranges.every(([lo, hi]) => !inRange(t, lo, hi)) ? t : 0), 0))

timer.stop();
