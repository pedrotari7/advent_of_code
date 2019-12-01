recipy = """Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
Sprinkles: capacity -3, durability 3, flavor 0, texture 0, calories 9
Candy: capacity -1, durability 0, flavor 4, texture 0, calories 1
Chocolate: capacity 0, durability 0, flavor -2, texture 2, calories 8"""

# recipy = """Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
# Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3"""

ingr = dict()
for s in recipy.split('\n'):
	ingr[s.split(':')[0]] = {l[0]:int(l[1]) for l in [n.split() for n in s.split(':')[1].split(',')]}


from itertools import product

total = -1

names = ingr.keys()

for a in product(range(100),repeat=len(names)):
	if sum(a) == 100:
		(c,d,f,t,cl) = (0,0,0,0,0)
		for i in xrange(len(names)):
			c += ingr[names[i]]['capacity']*a[i]
			d += ingr[names[i]]['durability']*a[i]
			f += ingr[names[i]]['flavor']*a[i]
			t += ingr[names[i]]['texture']*a[i]
			cl+= ingr[names[i]]['calories']*a[i]


		(c,d,f,t) = (max(0,c),max(0,d),max(0,f),max(0,t))

		if cl == 500:
			total = max(max(0,c*d*f*t), total)

print total
