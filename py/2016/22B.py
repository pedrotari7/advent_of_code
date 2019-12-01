with open('22.in') as f:
	strings  = [s.split() for s in f]

nodes = dict()
for s in strings[2:]:
	x,y = [int(n[1:]) for n in s[0].split('-')[-2:]]
	nodes[x,y] = {'size':int(s[1][:-1]),'used':int(s[2][:-1]),'avail':int(s[3][:-1]),'perce':int(s[4][:-1])}

	if nodes[x,y]['used'] == 0:
		empty = [x,y]


pairs = []

xmax,ymax = 0,0

for A in nodes:
	xmax, ymax= max(xmax,A[0]+1),max(ymax,A[1]+1)

	if nodes[A]['used']==0 : continue
	for B in nodes:
			if A!=B and nodes[A]['used']<=nodes[B]['avail']:
				pairs.append(A)


m = [['#' for y in xrange(xmax)] for x in xrange(ymax)]

for p in pairs: m[p[1]][p[0]] = '.' 
m[0][0] = '!'
m[0][-1] = 'G'
m[empty[1]][empty[0]] = '_'


for l in m:
	print ''.join(l)

print (empty[0]-1)+empty[1]+(xmax-2) + (xmax-2)*5
