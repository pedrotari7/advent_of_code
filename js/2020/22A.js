const { timer, getDataFromFile, int, sum, isEmpty } = require('../utilities');

timer.start();

const [p1, p2] = [...getDataFromFile(22).matchAll(/Player \d+:([0-9|\n\n]*)/gm)].map(l => l[1].split('\n').filter(Boolean).map(int));

while (!isEmpty(p1) && !isEmpty(p2)) {
    const [a, b] = [p1.shift(), p2.shift()];
    if (a > b) p1.push(a, b);
    else p2.push(b, a);
}

const deck = p1.length > 0 ? p1 : p2;

console.log(sum(deck.map((v, i) => (deck.length - i) * v)))

timer.stop();