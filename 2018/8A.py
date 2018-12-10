from collections import defaultdict

a = map(int,open('8.in').read().strip().split())

i = 0
node = 1
nodes = defaultdict(lambda: defaultdict(list))

def read_node(id):
    global i
    global node
    children, metadata = a[i], a[i+1]
    i += 2

    for _ in xrange(1, children + 1):
        node += 1
        nodes[id]['nodes'].append(read_node(node))

    nodes[id]['metadata'] = map(int, a[i: i+metadata])

    i += metadata

    return id

read_node(1)

print sum([sum(nodes[_]['metadata']) for _ in nodes])
