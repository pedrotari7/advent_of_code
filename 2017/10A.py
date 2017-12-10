
l = map(int,open('10.in').read().split(','))
s = 256
c = 0
r = range(s)
for i in xrange(len(l)):
    for j,m in enumerate(reversed([r[_%s] for _ in xrange(c,c+l[i])])): 
        r[(c+j)%s] = m
    c += (l[i]+i)%s

print r[0]*r[1]

