weakened, flagged = set(), set()

infected = {(i,j) for i,a in enumerate(open('22.in')) for j,b in enumerate(a.strip('\n')) if b=='#'}
s = len(open('22.in').readlines())/2

p = (s,s)
total = 0
d = (-1,0)

for _ in xrange(10**7):
    if p in infected:
        d = d[1], -1*d[0]
        infected.remove(p)
        flagged.add(p)
    elif p in weakened:
        total += 1
        weakened.remove(p)
        infected.add(p)
    elif p in flagged:
        d = -1*d[0], -1*d[1]
        flagged.remove(p)
    else:
        d = -1*d[1], d[0]
        weakened.add(p)
    p = p[0]+d[0], p[1]+d[1]

print total