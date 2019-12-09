const { getSplittedDataFromFile, str2num, intCode, perm } = require('../utilities');

const d = str2num(getSplittedDataFromFile(7, ','));

const HALT = 99;

const resetAmps = () => [
  { d: [ ...d ], o: { i: 0 } },
  { d: [ ...d ], o: { i: 0 } },
  { d: [ ...d ], o: { i: 0 } },
  { d: [ ...d ], o: { i: 0 } },
  { d: [ ...d ], o: { i: 0 } }
];

const run = (phases, amps) => {
  while (amps.map(amp => amp.o.op).some(e => e !== HALT)) {
    amps[0].o = intCode(amps[0].d, [ phases[0], 0 ], amps[0].o.i, amps[0].o.output);
    amps[1].o = intCode(amps[1].d, [ phases[1], amps[0].o.output ], amps[1].o.i, amps[1].o.output);
    amps[2].o = intCode(amps[2].d, [ phases[2], amps[1].o.output ], amps[2].o.i, amps[2].o.output);
    amps[3].o = intCode(amps[3].d, [ phases[3], amps[2].o.output ], amps[3].o.i, amps[3].o.output);
    amps[4].o = intCode(amps[4].d, [ phases[4], amps[3].o.output ], amps[4].o.i, amps[4].o.output);
  }
  return [ amps[4].o.output, resetAmps(amps) ];
};

let amps = resetAmps();
let result = 0;

const signals = perm([ 0, 1, 2, 3, 4 ]).map(p => {
  [ result, amps ] = run(p, amps);
  return result;
});

console.log(Math.max(...signals));
