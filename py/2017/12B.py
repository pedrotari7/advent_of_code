net = {int(n[0]):[int(_.strip(',')) for _ in n[2:]] for n in map(str.split,open('12.in'))}

visited = set()
groups = 0
for n in net:
    if n in visited: continue
    groups+=1
    to_visit = set([n])
    while to_visit:
        c = to_visit.pop()
        visited.add(c)
        to_visit = to_visit.union(set([ch for ch in net[c] if ch not in visited]))

print groups

