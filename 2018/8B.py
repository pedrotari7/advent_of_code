from collections import defaultdict

a = map(int,open('8.in').read().strip().split())

i = 0
node = 1
nodes = defaultdict(lambda: defaultdict(list))

def read_node(id):
    global i
    global node
    children = int(a[i])
    metadata = int(a[i+1])
    i += 2

    for _ in xrange(1, children + 1):
        node += 1
        nodes[id]['nodes'].append(read_node(node))

    nodes[id]['metadata'] = map(int, a[i: i+metadata])
    i += metadata

    return id


def node_value(s):
    if 'nodes' not in nodes[s]:
        return sum(nodes[s]['metadata'])

    return sum([node_value(nodes[s]['nodes'][n-1]) for n in nodes[s]['metadata'] if n <= len(nodes[s]['nodes'])])


read_node(1)

print node_value(1)
