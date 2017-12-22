infected = {(i,j) for i,a in enumerate(open('22.in')) for j,b in enumerate(a.strip('\n')) if b=='#'}
s = len(open('22.in').readlines())/2
p = (s,s)
d = (-1,0)
total = 0

for _ in xrange(10**4):
    if p in infected:
        d = d[1], -1*d[0]
        infected.remove(p)
    else:
        total += 1
        d = -1*d[1], d[0]
        infected.add(p)
    p = p[0]+d[0], p[1]+d[1]

print total