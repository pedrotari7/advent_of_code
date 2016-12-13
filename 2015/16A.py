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
	if all([smell in sue[s] and sue[s][smell]==goal[smell] for smell in sue[s]]):
		print s
		break
