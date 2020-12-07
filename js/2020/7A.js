const { getSplittedDataFromFile, timer, sum } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(7);

const bags = {};
const canHoldGold = {};

for (let line of data) {
    let [_, color, contents] = [...line.matchAll(/([a-z]+\s[a-z]+) bags contain\s(.+)/gm)][0];

    contents = contents.split(', ').map(b => {
        const match = [...b.matchAll(/.*[0-9]+\s([a-z]+\s[a-z]+) bag.*/gm)][0];
        return match ? match[1] : undefined;
    });

    bags[color] = contents[0] ? contents : null;
}

const canHold = (color) => {
    canHoldGold[color] = bags[color] && (bags[color].includes('shiny gold') || bags[color].some(canHold));

    return canHoldGold[color];
}

console.log(sum(Object.keys(bags).map(p => canHold(p))));


timer.stop();
