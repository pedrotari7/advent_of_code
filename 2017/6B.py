a = map(int, open('6.in').read().split('\t'))
c = list()

while a not in c:
    c.append(a[:])
    blocks = max(a)
    index = a.index(blocks)
    a[index] = 0
    for j in xrange(1,blocks+1):
        a[(index+j)%len(a)]+=1

print len(c)-c.index(a) 

