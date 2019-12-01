a =[_.split() for _ in open('12.in')]
f = '....' + a[0][2] + '....'
p = {_[0]:_[2] for _ in  a[2:]}

gene = 20
for _ in xrange(gene):
    f = '..' + ''.join([f[:2]] + [p[f[i-2:i+3]] for i in xrange(2,len(f)-2)] + [f[-2:]]) + '..'

print sum([i-2 - 2*gene for i,_ in enumerate(f[2:-2]) if _ == '#'])