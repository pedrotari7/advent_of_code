m = [0]
i = 0
for d in xrange(1,2017+1):
    i = (i+386)%d + 1
    m.insert(i, d)
print m[m.index(2017)+1]