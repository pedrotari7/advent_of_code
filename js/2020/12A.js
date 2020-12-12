const { getDataFromFile, timer, int, manhattanOrigin, cosd, sind } = require('../utilities');

timer.start();

const data = [...getDataFromFile(12).matchAll(/([A-Z]+)(\d+)/gm)].map(g => [g[1], int(g[2])]);

const final = data.reduce(({ x, y, dir }, [m, s]) => {
    if (m === 'N') y -= s;
    if (m === 'S') y += s;
    if (m === 'E') x += s;
    if (m === 'W') x -= s;
    if (m === 'L') dir -= s;
    if (m === 'R') dir += s;
    if (m === 'F') { x += s * cosd(dir); y += + s * sind(dir) };
    return { x, y, dir };
}, { x: 0, y: 0, dir: 0 })

console.log(Math.round(manhattanOrigin(final.x, final.y)))

timer.stop();
