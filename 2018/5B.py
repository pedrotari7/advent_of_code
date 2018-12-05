chars = [chr(i)+chr(i).upper() for i in xrange(ord('a'), ord('z')+1)]

def reduce(s):
    changes = True
    while changes:
        changes = False
        for c in chars:
            l = len(s)
            s = s.replace(c, '')
            s = s.replace(c[::-1],'')
            if l != len(s):
                changes = True
    return s

a = open('5.in').read().strip()

best = len(a) + 1

for r in chars:
    b = a

    for p in r:
        b = b.replace(p, '')

    l = len(reduce(b))
    if l < best:
        best = l

print best