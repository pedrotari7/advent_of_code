import { timer, getCharMatrixFromFile } from '../utilities.ts';

timer.start();

const connections = getCharMatrixFromFile(23, '-').reduce((acc, pair) => {
  if (!acc.has(pair[1])) {
    acc.set(pair[1], new Set<string>());
  }
  acc.get(pair[1])!.add(pair[0]);
  if (!acc.has(pair[0])) {
    acc.set(pair[0], new Set<string>());
  }
  acc.get(pair[0])!.add(pair[1]);
  return acc;
}, new Map<string, Set<string>>());

const areConnected = (members: string[]) => {
  for (const member of members) {
    for (const other of members) {
      if (other !== member && !connections.get(member)!.has(other)) {
        return false;
      }
    }
  }
  return true;
};

const triples = new Set<string>();

const Q = [...connections.keys()].map(k => [k]);

let p2: string = '';

const seen = new Set<string>();

while (Q.length) {
  const party = Q.pop()!;

  const valid = areConnected(party);

  const password = party.sort().join(',');

  if (!valid) {
    continue;
  }

  if (party.length === 3) {
    triples.add(party.sort().join('-'));
  }

  seen.add(password);
  if (p2.length < password.length) {
    p2 = password;
  }

  for (const member of connections.get(party[0])!) {
    if (party.includes(member)) {
      continue;
    }

    const newParty = [...party, member];
    if (!seen.has(newParty.sort().join(','))) {
      Q.push(newParty);
    }
  }
}

const ts = [...triples.values()].map(triple => triple.split('-')).filter(t => t.some(n => n.startsWith('t')));

console.log('p1', ts.length);
console.log('p2', p2);

timer.stop();
