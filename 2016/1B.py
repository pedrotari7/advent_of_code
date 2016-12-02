path = 'R3, L5, R2, L2, R1, L3, R1, R3, L4, R3, L1, L1, R1, L3, R2, L3, L2, R1, R1, L1, R4, L1, L4, R3, L2, L2, R1, L1, R5, R4, R2, L5, L2, R5, R5, L2, R3, R1, R1, L3, R1, L4, L4, L190, L5, L2, R4, L5, R4, R5, L4, R1, R2, L5, R50, L2, R1, R73, R1, L2, R191, R2, L4, R1, L5, L5, R5, L3, L5, L4, R4, R5, L4, R4, R4, R5, L2, L5, R3, L4, L4, L5, R2, R2, R2, R4, L3, R4, R5, L3, R5, L2, R3, L1, R2, R2, L3, L1, R5, L3, L5, R2, R4, R1, L1, L5, R3, R2, L3, L4, L5, L1, R3, L5, L2, R2, L3, L4, L1, R1, R4, R2, R2, R4, R2, R2, L3, L3, L4, R4, L4, L4, R1, L4, L4, R1, L2, R5, R2, R3, R3, L2, L5, R3, L3, R5, L2, R3, R2, L4, L3, L1, R2, L2, L3, L5, R3, L1, L3, L4, L3'

path = [p.strip() for p in path.split(',')]

theta = 90
x = [0,0]

points = [[0,0]]

for p in path:

	direct = 0 if p[0] == 'R' else 1

	dist = int(p[1:])

	if theta == 0:
		[points.append([x[0],x[1]+((-1)**(not(direct)))*i]) for i in xrange(1,dist+1)]
		x[1] += ((-1)**(not(direct)))*dist
	elif theta == 90:
		[points.append([x[0]+((-1)**direct)*i,x[1]]) for i in xrange(1,dist+1)]
		x[0] += ((-1)**direct)*dist
	elif theta == 180:
		[points.append([x[0],x[1]+((-1)**(direct))*i]) for i in xrange(1,dist+1)]
		x[1] += ((-1)**direct)*dist
	elif theta == 270:
		[points.append([x[0]+((-1)**(not(direct)))*i,x[1]]) for i in xrange(1,dist+1)]
		x[0] += ((-1)**(not(direct)))*dist

	theta = (theta + ((-1)**(not(direct)))*90) % 360


for p in points:
	if sum([1 for l in points if l == p]) > 1:
		d = abs(p[0]) + abs(p[1])
		print p,'dist:',d
		break