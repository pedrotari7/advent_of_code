const { timer, getIntMatrixFromFile, max, range } = require('../utilities');

timer.start();

const data = getIntMatrixFromFile(23, '')[0];

let current = 0;
let N = data.length;

const prev = (i, m) => ((i - 1) + N - m) % N + 1


for (const _ of range(1, 101)) {
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

const final = data.slice(data.indexOf(1) + 1).join('') + data.slice(0, data.indexOf(1)).join('')

console.log(final)
timer.stop();

