numbers = """1
2
3
7
11
13
17
19
23
31
37
41
43
47
53
59
61
67
71
73
79
83
89
97
101
103
107
109
113"""

# numbers = """1
# 2
# 3
# 4
# 5
# 7
# 8
# 9
# 10
# 11"""


def product(tuple1):
    prod = 1
    for x in tuple1:
        prod = prod * x
    return prod

from itertools import combinations 

numbers = sorted([int(n) for n in numbers.split('\n')])[::-1]

min_qe = [len(numbers), 2**20]

for n1 in xrange(2,len(numbers)-2):

	for g1 in combinations(numbers, n1):

		remain1 = list(set(numbers) - set(g1))

		for n2 in xrange(1,len(remain1)-1):

			for g2 in combinations(remain1, n2):

				g3 = tuple(set(remain1) - set(g2))

				# print g1,'\t',g2,'\t',g3

				if sum(g1) == sum(g2) and sum(g1) == sum(g3):
					# print (g1,g2,g3)
					
					if len(g1) <= min_qe[0]:
						min_qe = [len(g1),min(min_qe[1],product(g1))]
						# print '\n\n\n\n'
						break


print min_qe




