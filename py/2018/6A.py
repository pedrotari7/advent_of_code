def manhattan(p1, p2):
    return abs(p1[0]-p2[0]) + abs(p1[1]-p2[1])

a = {tuple(map(int, _.strip().split(', '))):0 for _ in open('6.in')}

corners = [ min(a), max(a), min(a, key=lambda x: x[1]), max(a, key=lambda x: x[1])]

infinity = set()

for j in xrange(corners[0][0], corners[1][0] + 1):
    for i in xrange(corners[2][1], corners[3][1] + 1):
        dists = sorted([(manhattan(p, (i,j)), p) for p in a])
        if dists[0][0] != dists[1][0]:
            a[dists[0][1]] += 1
            if i in [corners[2][1], corners[3][1]] or j in [corners[0][0], corners[1][0]]:
                infinity.add(dists[0][1])

print max(sorted([p[1] for p in a.items() if p[0] not in infinity]))
