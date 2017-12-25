from collections import defaultdict

data = open('25.in').read().split('\n\n')

s = data[0].split('\n')[0][-2]
steps = int(data[0].split()[-2])

states = dict()
for d in map(lambda x: x.split('\n'),data[1:]):
    state = d[0][-2]
    states[state] = defaultdict(dict)
    states[state][0]['write'] = int(d[2][-2])
    states[state][0]['move'] = 'right' if 'right' in d[3] else 'left'
    states[state][0]['next'] = d[4][-2]
    states[state][1]['write'] = int(d[6][-2])
    states[state][1]['move'] = 'right' if 'right' in d[7] else 'left'
    states[state][1]['next'] = d[8][-2]

i = 0
cs = [0]
c = 0

while i < steps:
    rules = states[s][cs[c]]
    cs[c] = rules['write']
    s = rules['next']
    c+= 1 if rules['move'] == 'right' else -1
    if c == len(cs): cs.append(0)
    elif c < 0: c = 0; cs = [0] + cs
    i+=1


print sum(cs)