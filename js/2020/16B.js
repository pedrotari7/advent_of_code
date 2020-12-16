const { getDataFromFile, timer, int, sum, zip, inRange, mult } = require('../utilities');

timer.start();

const info = getDataFromFile(16);

const cate = [...info.matchAll(/(.*): (\d+)-(\d+) or (\d+)-(\d+)/gm)].map(c => [c[1], ...c.slice(2, 6).map(int)])

const [myTicket, ...tickets] = [...info.matchAll(/[0-9]+(,[0-9]+)*/gm)]
    .map(t => t[0])
    .filter(t => t.includes(','))
    .map(t => t.split(',').map(int));


const isInRange = (f, [_, lo, hi, loo, hii]) => inRange(f, lo, hi) || inRange(f, loo, hii);

const validTickets = tickets.filter(t => t.every(f => cate.some(cat => isInRange(f, cat))));

let assigned = validTickets
    .map(valid => valid.map(n => cate.filter(cat => isInRange(n, cat)).map(c => c[0])))
    .reduce((acc, v) => zip(acc, v).map(([a, b]) => a.filter(x => b.includes(x))));

while (sum(assigned.map(v => v.length)) > myTicket.length) {
    for (let cat of assigned) {
        if (cat.length === 1) {
            assigned = assigned.map(c => (c.length > 1) ? c = c.filter(item => item !== cat[0]) : c);
        }
    }
}

assigned = assigned.flatMap(a => [...a]);

console.log(mult(zip(assigned, myTicket).filter(t => t[0].includes('departure')).map(t => t[1])))

timer.stop();
