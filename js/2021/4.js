const { getSplittedDataFromFile, timeit, int, range, sum } = require('../utilities');

const getCol = (arr, n) => arr.map((x) => x[n]);

const checkRows = (board) => board.some((r) => r.every(({ marked }) => marked));

const checkCols = (board) => range(0, board.length).some((i) => getCol(board, i).every(({ marked }) => marked));

const checkWin = (board) => checkRows(board) | checkCols(board);

const sumUnmarked = (board) => sum(board.map((r) => sum(r.map((d) => (d.marked ? 0 : d.n)))));

const mark = (board, m) => board.map((r) => r.map(({ n, marked }) => ({ n, marked: marked | (m === n) })));

const getWinningBoard = (boards) => boards.reduce((winingBoard, b) => (checkWin(b) ? b : winingBoard), undefined);

let [draw, ...boards] = getSplittedDataFromFile(4, '\n\n');

boards = boards.map((b) =>
  b.split('\n').map((r) =>
    r
      .split(' ')
      .filter(Boolean)
      .map((n) => ({ n: int(n), marked: false }))
  )
);

draw = draw.split(',').map(int);

const N = boards.length;

timeit(() => {
  for (const n of draw) {
    boards = boards.map((b) => mark(b, n));

    const won = getWinningBoard(boards);
    if (won && boards.length === N) {
      console.log('1:', n * sumUnmarked(won));
    }

    boards = boards.filter((b) => !checkWin(b));

    if (won && boards.length === 0) {
      console.log('2:', n * sumUnmarked(won));
      break;
    }
  }
});
