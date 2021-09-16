const { timer, getDataFromFile, int, isString, isNumeric, product, isArray } = require('../utilities');

timer.start();

const dp = (n) => {
    console.log('n', n)
    console.log('n.map(g => rlz[g]', n.map(g => rlz[g]))
    let d = [...product(...n.map(g => rlz[g].map(d => dp(d))))]

    if (d.every(c => isString(c))) d = d.join('');

    return d;
}

let [rules, messages] = getDataFromFile(19).split('\n\n');

const rlz = rules.split('\n').reduce((r, rule) => {
    const [_, num, req] = rule.match(/(\d+): (.*)/);
    if (req.includes("\"")) {
        r[int(num)] = eval(req);
    } else {
        r[int(num)] = req.split('|').map(a => a.split(' ').filter(Boolean).map(int));
    }
    return r;
}, {});

const poss = dp([0]);

console.log('poss', poss)

for (const p of poss[1])
    console.log('p', JSON.stringify(p))


console.log('pro', ...product(['a', 'c'], ['d', 'e']))

timer.stop();
