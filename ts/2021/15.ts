import { timer, getIntMatrixFromFile, PriorityQueue, DIR_NO_DIAG } from '../utilities.ts';

timer.start();

const data = getIntMatrixFromFile(15, '');

const R = data.length;
const C = data[0].length;

type Node = Record<string, number>;
type Graph = Record<string, Node>;

const idx = (a: number, b: number) => a + ',' + b;

const solve = (N: number) => {
  const graph: Graph = {};

  const vis: Record<string, boolean> = {};

  for (let r = 0; r < R * N; r++) {
    for (let c = 0; c < C * N; c++) {
      vis[idx(r, c)] = false;
      graph[idx(r, c)] = {};
      for (const d of DIR_NO_DIAG) {
        const [rr, cc] = [r + d[0], c + d[1]];
        if (rr >= 0 && rr < R * N && cc >= 0 && cc < C * N) {
          const more = Math.floor(rr / R) + Math.floor(cc / C);
          graph[idx(r, c)][idx(rr, cc)] = ((more + data[rr % R][cc % C] - 1) % 9) + 1;
        }
      }
    }
  }

  const findShortestPath = (graph: Graph, startNode: string, endNode: string) => {
    const dists: Record<string, number> = { endNode: Infinity, ...graph[startNode] };

    const Q = new PriorityQueue<string>();

    for (const neigh in graph[startNode]) {
      Q.enqueue(neigh, graph[startNode][neigh]);
    }

    while (!Q.isEmpty()) {
      const node = Q.dequeue()!;

      for (const child in graph[node]) {
        const newdistance = dists[node] + graph[node][child];
        if (!(child in dists) || dists[child] > newdistance) {
          dists[child] = newdistance;
          Q.enqueue(child, newdistance);
        }
      }
      vis[node] = true;
    }

    return dists[endNode];
  };

  return findShortestPath(graph, '0,0', `${N * R - 1},${N * C - 1}`);
};

console.log('p1', solve(1));
console.log('p2', solve(5));

timer.stop();
