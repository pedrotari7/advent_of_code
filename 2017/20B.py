def s(a,b,c): return zip(*[(x+y+z,y+z) for x,y,z in zip(a,b,c)])
a,p,v='a','p','v'

l = [eval('{'+_.replace('<','(').replace('>',')').replace('=',':')+'}') for _ in open('20.in')]

for _ in xrange(50):
    c = []
    for i,pt in enumerate(l):
        pt[p],pt[v] = s(pt[p],pt[v],pt[a])
        c.append(pt[p])
    l = [i for i in l if c.count(i[p])==1]

print len(l)