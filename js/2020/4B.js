const { timer, getSplittedDataFromFile, sum, int, inRange } = require('../utilities');

timer.start();

const req = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const data = getSplittedDataFromFile(4, '\n\n').map(p => [...p.matchAll(/(\S+):(\S+)/gm)]);

console.log(sum(data.map((pass) => {
    return req.every(v => pass.map(p => p[1]).includes(v)) && pass.every(([_, key, val]) => {
        switch (key) {
            case 'byr': return inRange(int(val), 1920, 2002);
            case 'iyr': return inRange(int(val), 2010, 2020);
            case 'eyr': return inRange(int(val), 2020, 2030);
            case 'hcl': return val.match(/^[#][0-9a-f]{6}$/);
            case 'pid': return val.match(/^[0-9]{9}$/);
            case 'ecl': return ecl.includes(val);
            case 'hgt':
                return (val.endsWith('cm') && inRange(int(val.slice(0, -2)), 150, 193)) ||
                    (val.endsWith('in') && inRange(int(val.slice(0, -2)), 59, 76));
            default: return true;
        }
    })
})));

timer.stop();
