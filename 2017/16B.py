def dance(m, moves):
    m = list(m)
    for d in moves:
        if 's' in d:
            s = int(d[1:])
            m = m[-1*s:]+m[:-1*s]
        elif 'x' in d:
            a,b = map(int,d[1:].split('/'))
            m[b], m[a] = m[a], m[b]
        elif 'p' in d:
            a,b = [int(m.index(_)) for _ in d[1:].split('/')]
            m[b], m[a] = m[a], m[b]
    return ''.join(m)

moves = open('16.in', 'r').read().split(',')
m = 'abcdefghijklmnop'
N = 10**9
seen = []

for _ in xrange(N):
    m = dance(m, moves)
    if m in seen:
        print seen[N%(_)-1]
        break
    seen.append(m)
