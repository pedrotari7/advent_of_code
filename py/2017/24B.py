a =[map(int,_.split('/')) for _ in open('24.in')]

def create_bridge(current, prev):
    if max_b[0] <= len(current):
        max_b[0] = len(current)
        max_b[1] = max(max_b[1], sum([l[0]+l[1] for l in current]))
    for p in [_ for _ in a if _ not in current and prev in _]:
        create_bridge(current+[p], p[0] if p[0]==p[1] else [dig for dig in p if dig!=prev][0])

max_b = [0,0]
for d in a:
    if 0 in d:
        create_bridge([d], d[-1])

print max_b