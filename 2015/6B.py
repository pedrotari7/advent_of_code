dim = 1000

l = [0]*dim
for i in xrange(dim):
    l[i] = [0]*dim

with open('6.in') as f:
    for c in f:
        c = c.split(' ')
        c1 = [int(n) for n in c[-3].split(',')]
        c2 = [int(n) for n in c[-1].split(',')]

        for i in xrange(c1[1],c2[1]+1):
            for j in xrange(c1[0],c2[0]+1):
                if len(c) == 4:
                    l[i][j] += 2
                elif 'on' in c:
                    l[i][j] += 1
                elif 'off' in c:
                    l[i][j] = max(0,l[i][j]-1)

total = 0

for i in xrange(dim):
    total += sum(l[i])

print total
