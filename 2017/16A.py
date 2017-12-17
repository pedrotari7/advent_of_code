m = list('abcdefghijklmnop')
for d in open('16.in', 'r').read().split(','):
    if 's' in d:
        s = int(d[1:])
        m = m[-1*s:]+m[:-1*s]
    elif 'x' in d:
        a,b = map(int,d[1:].split('/'))
        m[b], m[a] = m[a], m[b]
    elif 'p' in d:
        a,b = [int(m.index(_)) for _ in d[1:].split('/')]
        m[b], m[a] = m[a], m[b]

print ''.join(m)
