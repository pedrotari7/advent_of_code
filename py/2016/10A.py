with open('10.in','r') as f:
	strings = f.read()

bots = dict()

def compare(b):
	if b <0 or len(bots[b]['values']) < 2:
		return 
	if bots[b]['low'] >= 0:
		bots[bots[b]['low']]['values'].append(min(bots[b]['values']))
	if bots[b]['high'] >= 0:
		bots[bots[b]['high']]['values'].append(max(bots[b]['values']))

	if bots[b]['high'] >= 0: compare(bots[b]['high'])
	if bots[b]['low'] >= 0:	compare(bots[b]['low'])



for s in strings.split('\n'):
	c = s.split()
	if 'value' in c:
		if int(c[-1]) not in bots:
			bots[int(c[-1])] = {'values':[]}	
		bots[int(c[-1])]['values'].append(int(c[1]))	
	elif 'low' in c and 'high' in c:
		if int(c[1]) not in bots:
			bots[int(c[1])] = {'values':[]}
		bots[int(c[1])]['low'] = int(c[6]) if c[5]=='bot' else -int(c[6])-50
		bots[int(c[1])]['high'] = int(c[-1]) if c[-2]=='bot' else -int(c[-1])-50
 
for n in bots:
	if len(bots[n]['values']) == 2:
		break

compare(n)

for n in bots:
	if sorted(bots[n]['values']) == [17,61]:
		print n, 
		break


