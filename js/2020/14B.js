const { getSplittedDataFromFile, timer, sum, binRange } = require('../utilities');

timer.start();

const get36bit = (n) => n.toString(2).padStart(mask.length, '0')

const getX = (s) => s.split('').reduce((acc, v, idx) => {
    if (v === 'X') acc.push(idx);
    return acc;
}, []);

const data = getSplittedDataFromFile(14);

const mem = {};

let mask;

for (let inst of data) {
    if (inst.includes('mask')) {
        mask = inst.match(/mask = (\w+)/)[1].split('');
    } else {
        let [address, value] = inst.match(/mem\[(\d+)\] = (\d+)/).slice(1, 3).map(n => BigInt(n));

        address = get36bit(address).split('').map((v, i) => mask[i] === '0' ? v : mask[i]).join('');

        const exes = getX(address);
        for (const state of binRange(0, 2 ** exes.length, exes.length)) {
            let addr = BigInt('0b' + address.split('').map((v, idx) => {
                return v === 'X' ? state[exes.indexOf(idx)] : v;
            }).join(''), 2)
            mem[addr] = value;
        }
    }
}

console.log(sum(Object.values(mem)));

timer.stop();
