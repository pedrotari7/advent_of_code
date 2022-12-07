import { timer, getSplittedDataFromFile, int10, sum, min } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(7, '\n').map(e => e.split(' '));

interface Dir {
  parent: string;
  files: { size: number; name: string }[];
  folders: string[];
}

const dirs: Record<string, Dir> = { '/': { parent: '/', files: [], folders: [] } };
let cwd = '';

for (let i = 0; i < data.length; i++) {
  if (data[i][0] === '$') {
    switch (data[i][1]) {
      case 'cd': {
        const dir = data[i][2];

        if (dir === '..') {
          cwd = dirs[cwd].parent;
          break;
        }

        if (dir === '/') {
          cwd = '/';
          break;
        }

        dirs[cwd + '/' + dir] = { ...dirs[dir], parent: cwd };
        cwd += '/' + dir;
        break;
      }
      case 'ls': {
        i++;
        while (i < data.length && data[i][0] !== '$' && data[i].length > 1) {
          if (data[i][0] === 'dir') {
            if (!dirs[cwd].folders) dirs[cwd].folders = [];
            dirs[cwd].folders.push(cwd + '/' + data[i][1]);
          } else {
            if (!dirs[cwd].files) dirs[cwd].files = [];
            dirs[cwd].files.push({ size: int10(data[i][0]), name: data[i][1] });
          }
          i++;
        }
        i -= 1;
        break;
      }
    }
  }
}

const folderSize = (f: string): number =>
  sum(dirs[f].files?.map(({ size }) => size) ?? []) + sum(dirs[f].folders?.map(folderSize) ?? []);

const sizes: Record<string, number> = Object.keys(dirs).reduce((acc, f) => ({ ...acc, [f]: folderSize(f) }), {});

console.log('p1', sum(Object.values(sizes).filter(s => s < 100000)));

console.log('p2', min(Object.values(sizes).filter(s => s >= 30000000 - (70000000 - sizes['/']))));

timer.stop();
