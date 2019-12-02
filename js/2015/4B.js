const { getDataFromFile, md5 } = require('../utilities');

let key = getDataFromFile(4);

const zeros = (str, n) => str.startsWith('0'.repeat(n));

let i = 0;

while (!zeros(md5(`${key}${i}`), 6)) {
  i += 1;
}

console.log(i)