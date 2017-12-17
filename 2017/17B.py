i = 0
for d in xrange(1,50*10**6+1):
    i = (i+386)%d + 1
    if i == 1:
        r = d
print r