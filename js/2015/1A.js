const { getDataFromFile, charCount } = require('../utilities');

const data = getDataFromFile(1);

console.log(charCount(data, '(') - charCount(data, ')'));
