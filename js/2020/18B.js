const { getSplittedDataFromFile, timer } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(18).map(l => l.split('').filter(c => c !== ' '));

const isNumeric = (value) => /^-?\d+$/.test(value)

const calculate = (expr) => {
    let left = [];

    while (expr.length > 0) {
        const cur = expr.shift();
        if (cur === '(') {
            const stack = []
            let brackets = 1;

            while (brackets > 0) {
                const a = expr.shift();

                if (a === '(') brackets++;
                if (a === ')') brackets--;

                if (brackets === 0) {
                    left.push(eval(calculate((stack))));
                    continue;
                }
                stack.push(a);
            }
        } else if (isNumeric(cur) || cur === '+') {
            left.push(cur)
        } else {
            const right = [...expr];
            left.push(eval(`${calculate(left)} * ${calculate(right)}`));
            expr = [];
        }
    }
    return eval(left.join(''))
}

const total = data.reduce((s, expr) => s + calculate(expr), 0);

console.log(total);

timer.stop();
