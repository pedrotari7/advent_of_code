const { getSplittedDataFromFile, timer } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(18).map(l => l.split('').filter(c => c !== ' '));

const isNumeric = (value) => /^-?\d+$/.test(value)

const calculate = (expr) => {
    let val = 0;
    let op = '+';

    while (expr.length > 0) {
        const cur = expr.shift();
        if (isNumeric(cur)) {
            val = eval(`${val} ${op} ${cur}`)
        } else if (cur === '(') {
            const stack = []
            let brackets = 1;

            while (brackets > 0) {
                const a = expr.shift();

                if (a === '(') brackets++;
                if (a === ')') brackets--;

                if (brackets === 0) {
                    val = eval(`${val} ${op} ${calculate((stack))}`);
                    continue
                }
                stack.push(a);
            }
        } else {
            op = cur;
        }
    }
    return val;
}

const total = data.reduce((s, expr) => s + calculate(expr), 0);

console.log(total);

timer.stop();
