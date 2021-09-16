const { timer, getIntMatrixFromFile, max, range } = require('../utilities');

timer.start();

let data = getIntMatrixFromFile(23, '')[0];

let current = 0;
let N = data.length;

// data.push(range(N + 1, 1000001))

// data = data.flat()

console.log('data.length', data.length)
// const next = (i, m) => ((i - 1) + m) % N + 1;
const prev = (i, m) => ((i - 1) + N - m) % N + 1


for (const i of range(1, 10000001)) {
    console.log('i', i)
    const currentCup = data[current];

    let destinationCup = prev(data[current], 1);

    const three = data.splice((current + 1) % N, 3);

    if (three.length < 3) {
        three.push(...data.splice(0, 3 - three.length))
    }

    while (three.includes(destinationCup)) {
        destinationCup = prev(destinationCup, 1);
    }

    const destination = (data.indexOf(destinationCup) + 1) % N;

    data.splice(destination, 0, ...three);

    current = (data.indexOf(currentCup) + 1) % N;
}

const onePos = data.indexOf(1);

console.log('ata.indexOf(1)', data.slice(onePos + 1, onePos + 3))

timer.stop();

