with open('15.in','r') as f:
	discs = [(int(l.split()[3]),int(l.split()[-1].strip('.'))) for l in f.read().split('\n')]

t = 0
while not all([(d[1] + t+c+1) % d[0] == 0 for c,d in enumerate(discs)]):
    t += 1
print t