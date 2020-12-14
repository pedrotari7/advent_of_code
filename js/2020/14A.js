const { getSplittedDataFromFile, timer, sum } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(14);

const mem = {};

let AndMask, OrMask;

for (let inst of data) {
    if (inst.includes('mask')) {
        const mask = inst.match(/mask = (\w+)/)[1].split('');
        AndMask = BigInt('0b' + mask.map(b => b === '0' ? '0' : '1').join(''));
        OrMask = BigInt('0b' + mask.map(b => b === '1' ? '1' : '0').join(''));
    } else {
        const [address, value] = inst.match(/mem\[(\d+)\] = (\d+)/).slice(1, 3).map(n => BigInt(n));
        mem[address] = (value & AndMask) | OrMask;
    }
}

console.log(sum(Object.values(mem)));

timer.stop();
