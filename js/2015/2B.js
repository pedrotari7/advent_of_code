const { getSplittedDataFromFile, sum, str2num } = require('../utilities');

const data = getSplittedDataFromFile(2);

const ribbonLength = ([l, w, h]) => l * w * h + Math.min(2*l + 2*w, 2*w + 2*h, 2*h + 2*l);

console.log(sum(data.map(p => ribbonLength(str2num(p.split('x'))))));
