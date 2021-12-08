import { timer, getSplittedDataFromFile, int, range, sum } from '../utilities.ts';

type Board = { n: number; marked: boolean }[][];

const getCol = (arr: Board, n: number) => arr.map((x) => x[n]);

const checkRows = (board: Board) => board.some((r) => r.every(({ marked }) => marked));

const checkCols = (board: Board) => range(0, board.length).some((i) => getCol(board, i).every(({ marked }) => marked));

const checkWin = (board: Board) => checkRows(board) || checkCols(board);

const sumUnmarked = (board: Board) => sum(board.map((r) => sum(r.map((d) => (d.marked ? 0 : d.n)))));

const mark = (board: Board, m: number) =>
  board.map((r) => r.map(({ n, marked }) => ({ n, marked: marked || m === n })));

const getWinningBoard = (boards: Board[]) =>
  boards.reduce((winingBoard: Board | undefined, b) => (checkWin(b) ? b : winingBoard), undefined);

const [drawRaw, ...data] = getSplittedDataFromFile(4, '\n\n');

let boards: Board[] = data.map((b) =>
  b.split('\n').map((r) =>
    r
      .split(' ')
      .filter(Boolean)
      .map((n) => ({ n: int(n), marked: false }))
  )
);

const draw = drawRaw.split(',').map(int);

const N = boards.length;

timer.start();
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

timer.stop();
