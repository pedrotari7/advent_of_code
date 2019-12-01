const data = require('fs').readFileSync('1.in', 'utf8').split('\n');

const sum = a => a.reduce((x, y) => x + y, 0);

console.log(sum(data.map(e => Math.floor(+e / 3) - 2)));
