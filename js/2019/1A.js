const { sum, getSplittedDataFromFile } = require('../utilities');

const data = getSplittedDataFromFile(1);

console.log(sum(data.map(e => Math.floor(Number(e) / 3) - 2)));
