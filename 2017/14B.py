from operator import xor
from itertools import product

def hash_knot(n):
    l = map(ord,n)+[17,31,73,47,23]
    s = 256
    sparse_hash = range(s)
    c = 0
    for x in xrange(64):
        for i in xrange(len(l)):
            for j,m in enumerate(reversed([sparse_hash[_%s] for _ in xrange(c,c+l[i])])): 
                sparse_hash[(c+j)%s] = m
            c += (l[i]+x*len(l)+i)%s 

    return ''.join([hex(reduce(xor,sparse_hash[_*16:(_+1)*16]))[2:].zfill(2) for _ in xrange(16)])


a = 'uugsqrei'

total = 0
v = set() 
n = 128
m = [[] for _ in range(n)]

for i in xrange(n):
    c = hash_knot(a+'-'+str(i))
    m[i] = map(int, list(bin(int(c, 16))[2:].zfill(n)))

def group(i, j):
    if (i,j) not in v and m[i][j]:
        v.add((i, j))
        if i > 0: group(i-1,j)
        if i < n-1: group(i+1,j)
        if j > 0: group(i,j-1)
        if j < n-1: group(i,j+1)

for i,j in product(xrange(n),xrange(n)):
    if (i,j) not in v and m[i][j]:
        total+=1
        group(i,j) 

print total