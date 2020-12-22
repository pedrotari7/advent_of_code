const { timer, getDataFromFile, int, sum, isEmpty } = require('../utilities');

timer.start();

const hash = (p1, p2) => [p1.join(','), p2.join(',')].join('|');

const combat = ({ p1, p2 }) => {
    const hist = new Set();
    while (!isEmpty(p1) && !isEmpty(p2)) {
        const h = hash(p1, p2);

        if (hist.has(h)) return { p1, p2: [] };

        hist.add(h);

        const [a, b] = [p1.shift(), p2.shift()];

        let p1_wins;
        if (a <= p1.length && b <= p2.length) {
            const result = combat({ p1: p1.slice(0, a), p2: p2.slice(0, b) })
            p1_wins = isEmpty(result.p2);
        } else {
            p1_wins = a > b;
        }
        if (p1_wins) p1.push(a, b);
        else p2.push(b, a);
    }
    return { p1, p2 };
}

const [p1, p2] = [...getDataFromFile(22).matchAll(/Player \d+:([0-9|\n\n]*)/gm)].map(l => l[1].split('\n').filter(Boolean).map(int));

const state = { p1, p2 };

const final = combat(state);

const deck = final.p1.length > 0 ? final.p1 : final.p2;

console.log(sum(deck.map((v, i) => (deck.length - i) * v)))

timer.stop();