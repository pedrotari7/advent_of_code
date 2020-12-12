const { getDataFromFile, timer, int, manhattanOrigin, cosd, sind } = require('../utilities');

timer.start();

const data = [...getDataFromFile(12).matchAll(/([A-Z]+)(\d+)/gm)].map(g => [g[1], int(g[2])]);

const rotate = (wpx, wpy, ang) => [wpx * cosd(ang) - wpy * sind(ang), wpx * sind(ang) + wpy * cosd(ang)];

const final = data.reduce(({ x, y, wpx, wpy }, [move, steps]) => {
    if (move === 'N') wpy -= steps;
    if (move === 'S') wpy += steps;
    if (move === 'E') wpx += steps;
    if (move === 'W') wpx -= steps;
    if (move === 'L') [wpx, wpy] = rotate(wpx, wpy, -steps);
    if (move === 'R') [wpx, wpy] = rotate(wpx, wpy, steps);
    if (move === 'F') { x += wpx * steps; y += wpy * steps; }
    return { x, y, wpx, wpy };
}, { x: 0, y: 0, wpx: 10, wpy: -1 });

console.log(Math.round(manhattanOrigin(final.x, final.y)))

timer.stop();
