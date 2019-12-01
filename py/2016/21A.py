with open ('21.in','r') as f:
    strings = [[int(_) if _.isdigit() else _ for _ in _.split()] for _ in f]

def shift(w,n):
    return w[n%len(w):] + w[:n%len(w)]

w = list('abcdefgh')

for d in strings:
    if 'swap' in d and 'position' in d:
        w[d[5]], w[d[2]] = w[d[2]], w[d[5]]

    elif 'swap' in d and 'letter' in d:
        w = [d[2] if l == d[5] else d[5] if l in [d[2],d[5]] else l  for l in w]

    elif 'reverse' in d:
        n1, n2 = d[2],d[4]
        w = w[:n1] + w[n1:n2+1][::-1] + w[n2+1:]

    elif 'rotate' in d and ('step' in d or 'steps' in d):
        w = shift(w,(-1)**('right' in d)*d[2])

    elif 'rotate' in d and 'position' in d:
        n = w.index(d[-1])+2 if w.index(d[-1]) >= 4 else w.index(d[-1])+1
        w = shift(w,-1*n)

    elif 'move' in d:
        n1, n2 = d[2], d[5]
        if n2 > n1:
            w = w[:n1] + w[n1+1:n2+1] + [w[n1]] + w[n2+1:]
        elif n2 < n1:
            w = w[:n2] + [w[n1]] + w[n2:n1] + w[n1+1:] 

print ''.join(w)