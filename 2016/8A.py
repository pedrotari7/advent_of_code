def shift(seq, n):
    i = n % len(seq)
    return seq[-i:] + seq[:-i]

dim = (50,6)
l = [[0 for i in xrange(dim[0])] for j in xrange(dim[1])]

with open('8.in') as f:
    for c in f:
        cmd = c.split()

        if cmd[0] == 'rect':
            c = cmd[1].split('x')
            for i in xrange(int(c[1])):
                l[i][:int(c[0])] = [1]*int(c[0])

        elif 'row' in cmd:
            y = int(cmd[2].split('=')[1])
            l[y] = shift(l[y],int(cmd[4]))

        elif 'column' in cmd:
            x = int(cmd[2].split('=')[1])

            col = [l[i][x] for i in xrange(dim[1])]

            col = shift(col,int(cmd[4]))

            for i in xrange(dim[1]):
                l[i][x] = col[i]

    total = 0

    for i in xrange(dim[1]):
        total += l[i].count(1)

    print total
