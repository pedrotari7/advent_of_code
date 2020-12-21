const { timer, getDataFromFile, initMap, difference } = require('../utilities');

timer.start();

const words = s => [...s.matchAll(/([a-z]+)/gm)].map(c => c[1]);

const data = [...getDataFromFile(21).matchAll(/(.*) \(contains (.*)\)/gm)].map(c => c.slice(1, 3).map(words));

const ingredients = [...new Set(data.reduce((acc, [I, _]) => [...acc, I], []).flat())];
const allergens = [...new Set(data.reduce((acc, [_, A]) => [...acc, A], []).flat())];

const not_allowed = data.reduce((acc, [ings, ales]) => {
    for (const ale of ales) {
        const cannot = ingredients.filter(x => !ings.includes(x));
        acc[ale] = new Set([...acc[ale], ...cannot]);
    }
    return acc;
}, initMap(allergens, []));

let allowed = data.reduce((acc, [ings, ales]) => {
    for (const ale of ales) {
        const cannot = ingredients.filter(x => ings.includes(x));
        acc[ale] = new Set([...acc[ale], ...cannot]);
    }
    return acc;
}, initMap(allergens, []));

allowed = Object.entries(allowed).reduce((acc, [key, value]) => {
    acc[key] = difference(value, not_allowed[key]);
    return acc;
}, allowed);

while (!Object.values(allowed).every(v => v.size === 1)) {
    for (const ale of allergens) {
        if (allowed[ale].size === 1) {
            const ing = [...allowed[ale]][0];
            for (const other of allergens) {
                if (allowed[other].size > 1) {
                    allowed[other].delete(ing)
                }
            }
        }
    }
}

console.log(Object.entries(allowed).sort().map(v => [...v[1]][0]).join(','))

timer.stop();