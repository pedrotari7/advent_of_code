dists = """Faerun to Norrath = 129
Faerun to Tristram = 58
Faerun to AlphaCentauri = 13
Faerun to Arbre = 24
Faerun to Snowdin = 60
Faerun to Tambi = 71
Faerun to Straylight = 67
Norrath to Tristram = 142
Norrath to AlphaCentauri = 15
Norrath to Arbre = 135
Norrath to Snowdin = 75
Norrath to Tambi = 82
Norrath to Straylight = 54
Tristram to AlphaCentauri = 118
Tristram to Arbre = 122
Tristram to Snowdin = 103
Tristram to Tambi = 49
Tristram to Straylight = 97
AlphaCentauri to Arbre = 116
AlphaCentauri to Snowdin = 12
AlphaCentauri to Tambi = 18
AlphaCentauri to Straylight = 91
Arbre to Snowdin = 129
Arbre to Tambi = 53
Arbre to Straylight = 40
Snowdin to Tambi = 15
Snowdin to Straylight = 99
Tambi to Straylight = 70"""

def find_dist(cities, c1, c2):

	for c in cities[c1]:
		if c[0] == c2:
			return c[1]



cities = dict()

for d in dists.split('\n'):
	temp = [l.strip() for l in [c for c in d.split('=')][0].split(' to ')]
	dist = int(d.split('=')[1])

	if temp[1] in cities:
		cities[temp[1]].append((temp[0],dist))
	else:
		cities[temp[1]] = [(temp[0],dist)]


	if temp[0] in cities:
		cities[temp[0]].append((temp[1],dist))
	else:
		cities[temp[0]] = [(temp[1],dist)]

from itertools import permutations

min_dist = 2**30

for r in permutations(cities.keys(),len(cities.keys())):
	current = 0
	for i in xrange(0,len(r)-1):
		current += find_dist(cities,r[i],r[i+1])

	if current < min_dist:
		min_dist = current

print min_dist
