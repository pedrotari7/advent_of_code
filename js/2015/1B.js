const { getSplittedDataFromFile } = require('../utilities');

const data = getSplittedDataFromFile(1, '');

let currentFloor = 0;
let i = 0;

while (currentFloor >= 0) {
  currentFloor += data[i] === '(' ? 1 : -1;
  i += 1;
}

console.log(i);
