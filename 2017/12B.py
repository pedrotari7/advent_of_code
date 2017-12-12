net = {int(n[0]):[int(_.strip(',')) for _ in n[2:]] for n in map(str.split,open('12.in'))}

def group(n):
    visited = set()
    to_visit = set([n])
    while to_visit:
        c = to_visit.pop()
        visited.add(c)
        to_visit = to_visit.union(set([ch for ch in net[c] if ch not in visited]))
    return visited

groups = []

for s in net:
    new_group = group(s)
    if not any((bool(set(new_group) & set(g)) for g in groups)):
            groups.append(new_group)

print len(groups)

