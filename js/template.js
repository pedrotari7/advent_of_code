const {{ getSplittedDataFromFile, timer }} = require('../utilities');

timer.start();

const data = getSplittedDataFromFile({0});

console.log(data);

timer.stop();
