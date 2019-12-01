with open('22.in') as f:
	strings  = [s.split() for s in f]

nodes = dict()
for s in strings[2:]:
	x,y = [int(n[1:]) for n in s[0].split('-')[-2:]]
	nodes[x,y] = {'size':int(s[1][:-1]),'used':int(s[2][:-1]),'avail':int(s[3][:-1]),'perce':int(s[4][:-1])}

pairs = 0

for A in nodes:
	if nodes[A]['used']==0 : continue
	for B in nodes:
			if A!=B and nodes[A]['used']<=nodes[B]['avail']:
				pairs+=1

print pairs