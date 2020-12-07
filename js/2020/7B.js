const { getSplittedDataFromFile, timer, sum, int } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(7);

const bags = {};
const capacity = {};

for (let line of data) {
    let [_, color, contents] = [...line.matchAll(/([a-z]+\s[a-z]+) bags contain\s(.+)/gm)][0];

    contents = contents.split(', ').map(b => {
        const match = [...b.matchAll(/.*([0-9])+\s([a-z]+\s[a-z]+) bag.*/gm)][0];
        return match ? [int(match[1]), match[2]] : undefined;
    });

    bags[color] = contents[0] ? contents : null;
}


const canHold = (color) => {
    capacity[color] = bags[color] && sum(bags[color].map(p => p[0] * (1 + canHold(p[1]))));
    return capacity[color];
}



console.log(canHold('shiny gold'));
timer.stop();
