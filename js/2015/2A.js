const { getSplittedDataFromFile, sum, str2num } = require('../utilities');

const data = getSplittedDataFromFile(2);

const surfaceArea = ([l, w, h]) => 2 * l * w + 2 * w * h + 2 * h * l + Math.min(l * w, w * h, h * l);

console.log(sum(data.map(p => surfaceArea(str2num(p.split('x'))))));
