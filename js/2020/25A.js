const { timer, getIntMatrixFromFile, range } = require('../utilities');

timer.start();

const update = (value, subject) => (value * subject) % 20201227;

const transform = (subject, loopSize) => range(0, loopSize).reduce((value, _) => update(value, subject), 1)

const crack = pk => {
    let loopSize = 0;
    let value = 1;

    while (value !== pk) {
        value = update(value, 7);
        loopSize++;
    }
    return loopSize;
}

const [cardPK, doorPK] = getIntMatrixFromFile(25).flat();

const doorLoopSize = crack(doorPK);

console.log(transform(cardPK, doorLoopSize))

timer.stop();
