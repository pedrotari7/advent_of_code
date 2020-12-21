const { timer, getDataFromFile, sum, initMap, intersect } = require('../utilities');

timer.start();

const words = s => [...s.matchAll(/([a-z]+)/gm)].map(c => c[1]);

const data = [...getDataFromFile(21).matchAll(/(.*) \(contains (.*)\)/gm)].map(c => c.slice(1, 3).map(words));

const ingredients = [...new Set(data.reduce((acc, [I, _]) => [...acc, I], []).flat())];
const allergens = [...new Set(data.reduce((acc, [_, A]) => [...acc, A], []).flat())];

const count = data.reduce((acc, [ings, _]) => {
    for (const ing of ings) {
        acc[ing]++;
    }
    return acc;
}, initMap(ingredients, 0));

const a = data.reduce((acc, [ings, ales]) => {
    for (const ale of ales) {
        const cannot = ingredients.filter(x => !ings.includes(x));
        acc[ale] = new Set([...acc[ale], ...cannot]);
    }
    return acc;
}, initMap(allergens, []));

const inter = Object.values(a).reduce((inter, s) => intersect(inter, s), new Set(ingredients))

console.log(sum([...inter].map(c => count[c])));

timer.stop();
