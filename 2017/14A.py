from operator import xor

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
print sum([bin(int(hash_knot(a+'-'+str(i)), 16))[2:].count('1') for i in xrange(128)])
