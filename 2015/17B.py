cont = """33
14
18
20
45
35
16
35
1
13
18
13
50
44
48
6
24
41
30
42"""

from itertools import combinations

N = 150

cont =  [int(c) for c in cont.split('\n')]

poss = 0

min_size = 2**23
min_count = 0

for i in xrange(1,len(cont)+1):
	for c in combinations(cont, i):
		if sum(c) == N:
			if len(c) < min_size:
				min_size = len(c)
				min_count = 1
			elif len(c) == min_size:
				min_count += 1


print min_count