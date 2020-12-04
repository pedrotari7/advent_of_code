const { timer, getSplittedDataFromFile, sum } = require('../utilities');

timer.start();

const req = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const data = getSplittedDataFromFile(4, '\n\n').map(p => [...p.matchAll(/(\S+):(\S+)/gm)].map(r => r[1]));

console.log(sum(data.map((keys) => req.every(v => keys.includes(v)))));

timer.stop();
