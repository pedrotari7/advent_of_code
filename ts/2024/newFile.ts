import { Q, areConnected, seen, p2, connections } from './23';

while (Q.length) {
  const party = Q.pop()!;

  // console.log('Q.length', Q.length);
  const valid = areConnected(party);

  const password = party.sort().join(',');

  console.log('seen', seen.size);

  if (!valid) {
    continue;
  }

  seen.add(password);
  if (p2.length < party.length) {
    p2 = password;
    console.log('p2', password, p2.length);
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
