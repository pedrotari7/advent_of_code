def manhattan(p1, p2):
    return abs(p1[0]-p2[0]) + abs(p1[1]-p2[1])

a = {tuple(map(int, _.strip().split(', '))):0 for _ in open('6.in')}

total = 0
dist = 10000
for i in xrange(min(a)[0], max(a)[0] + 1):
    for j in xrange(min(a, key=lambda x: x[1])[1], max(a, key=lambda x: x[1])[1] + 1):
        total += sum(manhattan(p, (i,j)) for p in a) < dist

print total
