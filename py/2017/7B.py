from collections import defaultdict as df, Counter
graph = df(dict)
for n in map(str.split, open('7.in')):
    graph[n[0]]['value'] = int(n[1][1:-1])
    graph[n[0]]['weights'] = int(n[1][1:-1])
    if len(n) > 2:
        graph[n[0]]['children'] = [_.strip(',') for _ in n[3:]]
        for ch in graph[n[0]]['children']:
            graph[ch]['parent'] = n[0]

for n in graph:
    if 'parent' not in graph[n]:
        root = n
        break

def calculate_weights(g, k):
    if 'children' in g[k]:
        g[k]['weights'] += sum(calculate_weights(graph, ch) for ch in g[k]['children'])
    return g[k]['weights']

def find_unbalanced(g, k):
    if 'children' not in g[k]: return (True,g[k]['value'])
    weights = [graph[ch]['weights'] for ch in g[k]['children']]
    weights_c = Counter(weights).most_common()
    if weights_c[0] == weights_c[-1]: return (True,g[k]['value'])
    wrong = g[k]['children'][weights.index(weights_c[-1][0])]
    fb = find_unbalanced(g, wrong)
    if fb[0]: return (False, g[wrong]['value']+(weights_c[0][0]-weights_c[-1][0]))
    else: return fb

calculate_weights(graph, root)

print find_unbalanced(graph, root)[1]
