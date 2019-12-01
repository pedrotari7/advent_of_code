from itertools import combinations

m = []

for p in combinations(open('2.in').read().split(), 2):
    d  = [l1 for l1,l2 in zip(p[0], p[1]) if l1==l2]
    if len(d) > len(m): m = d

print ''.join(m)
