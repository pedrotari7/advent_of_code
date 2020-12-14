const { timer, int, getSplittedDataFromFile, minArray, mult } = require('../utilities');

timer.start();

let [dep, buses] = getSplittedDataFromFile(13);

dep = int(dep)

buses = buses.split(',').filter(b => b !== 'x').map(b => int(b))

console.log(mult(minArray(buses.map(b => [b - dep % b, b]))))

timer.stop();
