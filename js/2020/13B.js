const { getSplittedDataFromFile, timer, int, mult } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(13)[1].split(',')
    .map((id, i) => [id, i])
    .filter(b => b[0] !== 'x')
    .map(b => [int(b[0]), (int(b[0]) - b[1])]);

const crt = (nums) => {
    const prod = mult(nums.map(n => n[0]));

    const sum = nums.reduce((sum, [num, rem]) => {
        const p = Math.floor(prod / num);
        return sum + rem * p * mulInv(p, num);
    }, 0);
    return sum % prod;
}

function mulInv(a, b) {
    const b0 = b;
    let [x0, x1] = [0, 1];

    if (b === 1) return 1;

    while (a > 1) {
        const q = Math.floor(a / b);
        [a, b] = [b, a % b];
        [x0, x1] = [x1 - q * x0, x0];
    }
    if (x1 < 0) x1 += b0;
    return x1;
}

console.log(crt(data));

timer.stop();
