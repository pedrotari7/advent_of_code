e = ''
with open('6.in') as f:
    m = [list(i) for i in f.read().split('\n')]
    for i in xrange(len(m[0])):
        row = []
        for j in xrange(len(m)):
            row.append(m[j][i])

        e += max([(row.count(c),c) for c in row])[1]

    print ''.join(e)