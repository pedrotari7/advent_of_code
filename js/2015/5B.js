const { getSplittedDataFromFile, sum } = require('../utilities');

const data = getSplittedDataFromFile(5, '\n');

const oneGap = str => str.split('').some((s, i, arr) => i + 2 < arr.length ? s === arr[i + 2] : false);

const repeats = str => str.split('').some((s, i, arr) => i + 3 < arr.length ? (str.lastIndexOf(s+arr[i+1]) - str.indexOf(s+arr[i+1])) > 1 : false);

const isNice = s => oneGap(s) && repeats(s);

console.log(sum(data.map(s => isNice(s))));