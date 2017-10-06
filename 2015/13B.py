from itertools import permutations

def get_happiness(t,p1,p2):
    for s in t[p1]:
        if s[0] == p2:
            return s[1]


t = dict()

with open('13.in') as f:
    for r in f:
        name = r.split()[0]
        last = r.replace('.','').split()[-1]
        gain = int(r.split('happiness')[0].strip().split()[-1])*(-1)**('lose' in r)

        if name in t:
            t[name].append((last,gain))
        else:
            t[name]=[(last,gain)]

for r in t.keys():
    t[r].append(('me',0))

for r in t.keys():
    if 'me' not in t:
        t['me'] = []
    t['me'].append((r,0))

out = -2**30

for p in permutations(t.keys()):
    total = 0
    for i in xrange(len(p)):
        total += get_happiness(t,p[i],p[(i+1)%len(p)]) + get_happiness(t,p[i],p[(i-1)%len(p)])
    if total > out:
        out = total

print out