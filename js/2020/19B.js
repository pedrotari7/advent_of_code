const { getSplittedDataFromFile, timer } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(19);

console.log(data);

timer.stop();
