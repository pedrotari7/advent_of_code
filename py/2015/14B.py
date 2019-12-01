with open('14.in') as f:
	info = f.read()

rd = dict()

for s in info.split('\n'):

	c = [l.split() for l in  s.split('seconds') if l!='']

	rd[c[0][0]] = {'speed':int(c[0][3]),'active':int(c[0][-1]),'rest':int(c[1][-1]),'flying':True,'distance':0,'points':0,'current':0}


t = 2503
i = 0
while i < t:
	for r in rd:
		rd[r]['current'] +=1
		if rd[r]['flying']:
			rd[r]['distance'] += rd[r]['speed']

		if (rd[r]['flying'] and rd[r]['current'] == rd[r]['active']) \
			 or (not rd[r]['flying'] and rd[r]['current'] == rd[r]['rest']):
			rd[r]['current'] = 0
			rd[r]['flying'] = not rd[r]['flying']			 


	rd[max([(rd[n]['distance'],n) for n in rd])[1]]['points'] += 1


	i+=1


print max([rd[r]['points'] for r in rd])