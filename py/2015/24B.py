from functools import reduce
from itertools import combinations
from operator import mul

with open('24.in') as f:
	numbers = [int(x) for x in f.read().split('\n')]

group_size = sum(numbers) // 4

for i in xrange(group_size):
    qe = [reduce(mul, c) for c in combinations(numbers, i) if sum(c) == group_size]
    if qe:
        break

print min(qe)