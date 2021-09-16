const { timer, getIntMatrixFromFile } = require('../utilities');

timer.start();

class Cup {
    constructor(n, prev = null, next = null) {
        this.value = n;
        this.next = next ? next : this;
        this.prev = prev ? prev : this;
    }
}

const add = (cups, n) => {
    const cup = new Cup(n, cups);

    cups.next = cup;

}

const data = getIntMatrixFromFile(23, '')[0];

const start = new Cup(data[0]);

let current = start;

for (const n of data.slice(1)) {
    current = add(current, n)
}

