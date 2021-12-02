const {{ getSplittedDataFromFile, timeit }} = require('../utilities');

timeit(() => {{
    const data = getSplittedDataFromFile({0});
    console.log(data);
}});