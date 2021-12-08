import {{ timer, getSplittedDataFromFile }} from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile({0});
console.log(data);

timer.stop();