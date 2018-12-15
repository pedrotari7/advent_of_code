import collections, itertools

def get_data():
    u, nodes = dict(), set()

    for r,line in enumerate(open('15.in')):
        for c,a in enumerate(line.strip()):
            if a in 'EG': u[(r,c)] = {'m': a, 'hp': 200}
            if a != '#': nodes.add((r,c))
    return u, nodes


def closest_path(start, goal):
    queue = collections.deque([[start]])
    seen = set([start])
    while queue:
        path = queue.popleft()
        r, c = path[-1]
        for p in ((r-1,c), (r,c-1), (r,c+1), (r+1,c)):
            if p == goal: return path
            if p in nodes and p not in seen and p not in u:
                queue.append(path + [p])
                seen.add(p)

def can_attack(unit, enemies):
    r,c = unit

    for r_other, c_other in sorted(enemies,key=lambda k: (u[k]['hp'], k)):
        if (r==r_other or c==c_other)  and (abs(r-r_other) == 1 or abs(c-c_other) == 1):
            return (r_other, c_other)


for power in itertools.count(4):
    u, nodes = get_data()

    rd = 0

    abort = False

    while len(set([u[e]['m'] for e in u])) > 1:
        rd += 1
        for unit in sorted(u):
            if unit not in u: continue

            enemies = [e for e in u if u[e]['m']!=u[unit]['m']]

            close_enemy = can_attack(unit, enemies)

            if not close_enemy:

                paths = [[closest_path(unit, enemy), enemy] for enemy in enemies]
                paths = [path for path in paths if path[0]]

                if not paths:
                    continue

                sorted_paths = sorted(paths, key = lambda _: (len(_[0]), _[1]))
                next_p = sorted_paths[0][0][1]

                u[next_p] = u[unit]
                del u[unit]

                unit = next_p

            enemies = [e for e in u if u[e]['m']!=u[unit]['m']]

            close_enemy = can_attack(unit, enemies)

            if close_enemy:
                u[close_enemy]['hp'] -=  power if u[unit]['m'] == 'E' else 3

                if u[close_enemy]['hp'] <= 0:
                    if u[close_enemy]['m'] == 'E':
                        abort = True
                        break
                    del u[close_enemy]
        if abort:
            break

    if len([e for e in u if u[e]['m']=='E']) > 0 and not abort:
        break

print sum(u[e]['hp'] for e in u)*(rd-1)