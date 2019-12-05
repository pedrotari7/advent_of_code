const { getSplittedDataFromFile, str2num, range } = require('../utilities');

const increasing = (nums) => nums.toString() === [ ...nums ].sort().toString();

const doubles = str => str.toString().split('').some((s, i, arr) => i + 1 < arr.length ? s === arr[i + 1] : false);

const valid = num => increasing(str2num(num.toString().split(''))) && doubles(num);

console.log(range(...str2num(getSplittedDataFromFile(4, '-'))).filter(valid).length);
