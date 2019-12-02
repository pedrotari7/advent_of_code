const { getSplittedDataFromFile, sum, charCount } = require('../utilities');

const data = getSplittedDataFromFile(5, '\n');

const has3vowels = str => sum('aeiou'.split('').map(c => charCount(str, c))) > 2;

const noBadStrings = str => ['ab', 'cd', 'pq', 'xy'].every(s => !str.includes(s))

const noDoubles = str => str.split('').some((s, i, arr) => i + 1 < arr.length ? s === arr[i + 1] : false);

const isNice = s => has3vowels(s) && noBadStrings(s) && noDoubles(s);

console.log(sum(data.map(s => isNice(s))));