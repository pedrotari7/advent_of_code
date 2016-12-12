import itertools, copy

def print_floors(f,e):
	for i,l in enumerate(f):
		if i == e:
			print 'E',
		print '\t', 	
		if len(l) == 0:
			print '-',
		else:
			for k in l:
				print k,' ',
		print '\n',
	print '\n',


def is_floor_valid(f):

	for n in f:

		types = [i[1] for i in n]

		if len(set(types)) == 1:
			continue

		for m in n:
			if m[1]=='M':
				if (m[0],'G') not in n:
					return False

	return True

best = [34,[]]

def move(floors,current,total,seq):
	global best
	# print total,current, floors
	print total
	# print_floors(floors,current)

	seq.append(floors)

	if total > best[0]:
		return

	if len(floors[0]) == 10:
		print '\n\nFound way with ' + str(total) + ' moves' 
		if total < best[0]:
			best = [total,seq]
		return

	next_moves = list(itertools.combinations(set(floors[current]),2))+list(itertools.combinations(set(floors[current]),1))

	for m in next_moves:

		if len(m) == 1 or m[0][1] == m[1][1] or m[0][0] == m[1][0]:
			if current > 0:
				copied_floors = copy.deepcopy(floors)
				copied_floors[current-1].update(list(m))
				[copied_floors[current].remove(ele) for ele in m]
				if is_floor_valid(copied_floors) and copied_floors not in seq:
					move(copied_floors,current-1,total+1,copy.copy(seq))

			if current < 3:
				if sum([len(floors[i]) for i in xrange(current+1,4)])!=0:
					copied_floors = copy.deepcopy(floors)
					copied_floors[current+1].update(list(m))
					[copied_floors[current].remove(ele) for ele in m]
					if is_floor_valid(copied_floors) and copied_floors not in seq:
						move(copied_floors,current+1,total+1,copy.copy(seq))


floors = [
set([]),
set([('CO','M'),('CU','M'),('R','M'),('PL','M')]),
set([('CO','G'),('CU','G'),('R','G'),('PL','G')]),
set([('PR','G'),('PR','M')])
]

# floors = [
# set([]),
# set([('L','G')]),
# set([('H','G')]),
# set([('H','M'),('L','M')])
# ]


move(floors,3,0,[])

for b in best[1]:
	print_floors(b,0)


print len(best[1])-1
