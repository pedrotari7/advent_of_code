from collections import defaultdict as df
graph = df(dict)
for n in map(str.split, open('7.in')):
    graph[n[0]]['value'] = int(n[1][1:-1])
    if len(n) > 2:
        graph[n[0]]['children'] = [_.strip(',') for _ in n[3:]]
        for ch in graph[n[0]]['children']:
            graph[ch]['parent'] = n[0]

for n in graph:
    if 'parent' not in graph[n]:
        print n
        break
