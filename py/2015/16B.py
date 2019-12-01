sue = dict()

with open('16.in') as f:
	for line in f.readlines():
		number = line.split(':')[0].split()[1] 
		sue[number] = dict()

		a = line.replace(',',':').split(':')[1:]

		for i in xrange(0,len(a)-1,2):
			sue[number][a[i].strip()] = int(a[i+1].strip()) 


goal = {'children':3,'cats':7,'samoyeds':2,'pomeranians':3,'akitas':0,\
		'vizslas':0,'goldfish':5,'trees':3,'cars':2,'perfumes':1}

for s in sue:

	valid = True

	for smell in sue[s]:
		if smell in goal:
			if smell in ['cats','trees']:
				if sue[s][smell]<=goal[smell]:
					valid = False
					break 
			elif smell in ['pomeranians','goldfish']:
				if sue[s][smell]>=goal[smell]:
					valid = False
					break 
			else:
				if sue[s][smell]!=goal[smell]:
					valid = False
					break
		else:
			valid = False
			break

	if valid:
		print s
		break
