def g(m): return min([(sum(map(abs,_['p'])),i) for i,_ in enumerate(m)])[1]
def s(a,b,c): return zip(*[(x+(y+z),y+z) for x,y,z in zip(a,b,c)])
a,p,v='a','p','v'

l = [eval('{'+_.replace('<','[').replace('>',']').replace('=',':')+'}') for _ in open('20.in')]

for _ in xrange(500):
    for i,pt in enumerate(l):
        pt[p],pt[v] = s(pt[p],pt[v],pt[a])
print g(l)
