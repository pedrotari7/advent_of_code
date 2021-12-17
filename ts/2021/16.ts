import { timer, getDataFromFile, int, min, max, hexToBinary, sum, mult } from '../utilities.ts';

timer.start();

enum TypeID {
  SUM = 0,
  PRODUCT = 1,
  MINIMUM = 2,
  MAXIMUM = 3,
  LITERAL = 4,
  GREATER = 5,
  LESS = 6,
  EQUAL = 7,
}

type Packet = {
  typeID: TypeID;
  version: number;
  literal?: number;
  subPackets?: Packet[];
};

const data = getDataFromFile(16);

let offset = 0;

const binN = hexToBinary(data);

const peek = (n: number) => binN.slice(offset, offset + n);

const read = (n: number) => {
  const temp = peek(n);
  offset += n;
  return temp;
};

const readLiteral = (packet: Packet) => {
  let literal = '';

  while (read(1) !== '0') {
    literal += read(4);
  }
  literal += read(4);

  packet.literal = int(literal, 2);
  return packet;
};

const readOperator = (packet: Packet) => {
  const I = read(1);

  const len = I === '0' ? 15 : 11;

  const L = int(read(len), 2);

  if (I === '0') {
    const start = offset;
    while (offset - start < L) {
      packet.subPackets?.push(readPacket());
    }
  } else if (I === '1') {
    for (let p = 0; p < L; p++) {
      packet.subPackets?.push(readPacket());
    }
  }
  return packet;
};

const readPacket = () => {
  const version = int(read(3), 2);

  versionSum += version;

  const typeID = int(read(3), 2);

  const packet: Packet = { version, typeID, subPackets: [] };

  if (typeID === TypeID.LITERAL) {
    return readLiteral(packet);
  } else {
    return readOperator(packet);
  }
};

let versionSum = 0;

const top = readPacket();

console.log(versionSum);

const resolvePacket = ({ typeID, subPackets, literal }: Packet): number => {
  const sp = subPackets!.map(resolvePacket);

  if (typeID === TypeID.LITERAL) return literal!;
  if (typeID === TypeID.SUM) return sum(sp);
  if (typeID === TypeID.PRODUCT) return mult(sp);
  if (typeID === TypeID.MINIMUM) return min(sp);
  if (typeID === TypeID.MAXIMUM) return max(sp);
  if (typeID === TypeID.GREATER) return +(sp[0] > sp[1]);
  if (typeID === TypeID.LESS) return +(sp[0] < sp[1]);
  if (typeID === TypeID.EQUAL) return +(sp[0] === sp[1]);
  return 0;
};

console.log(resolvePacket(top));
timer.stop();
