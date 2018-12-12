a =[_.split() for _ in open('12.in')]
f = '....' + a[0][2] + '....'
p = {_[0]:_[2] for _ in  a[2:]}

prev = set()

gene = 50*10**9

for g in xrange(gene):
    f = '..' + ''.join([f[:2]] + [p[f[i-2:i+3]] for i in xrange(2,len(f)-2)] + [f[-2:]]) + '..'

    pattern = f.strip('.')
    if pattern in prev:
        break
    prev.add(pattern)

left = gene - g - 4

d = [i-3 - 2*g for i in xrange(left + f.find('#'),left + f.find('#') + f.count('#')*3, 3)]
print sum(d)