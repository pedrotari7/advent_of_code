const { getSplittedDataFromFile, str2num, range } = require('../utilities');

const increasing = nums => nums.toString() === [...nums].sort().toString();

const doubles = str => str.toString().split('').some((s, i, arr) => {
    if (i + 2 < arr.length) {
      return s === arr[i + 1] && s !== arr[i + 2] && s !== arr[i - 1];
    } else if (i + 1 < arr.length) {
      return s === arr[i + 1] && s !== arr[i - 1];
    }
  });

const valid = num => increasing(str2num(num.toString().split(''))) && doubles(num);

console.log(range(...str2num(getSplittedDataFromFile(4, '-'))).filter(valid).length);

