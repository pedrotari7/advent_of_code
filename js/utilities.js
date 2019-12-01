const fs = require('fs');

// Read from file operations

const getDataFromFile = (day) => fs.readFileSync(`${day}.in`, 'utf8');

exports.getDataFromFile = getDataFromFile;

exports.getSplittedDataFromFile = (day, dele='\n') => getDataFromFile(day).split(dele)

// Array operations

exports.sum = a => a.reduce((x, y) => x + y, 0);

exports.mult = a => a.reduce((x, y) => x*y, 1);

exports.str2num = a => a.map(e => +e);

// String operations

exports.charCount = (str, chr) => str.split('').reduce((r, c) => c === chr ? r + 1 : r, 0)
