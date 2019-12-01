with open('bonuschallenge.in','r') as f:
    insts = [s.split() for s in f]

p = 0

r = {'a':12,'b':0,'c':0,'d':0}

text = []

def get_value(v):
    try: return int(v)
    except: return r[v]

while p < len(insts) and p >= 0:
    inst = insts[p][0]

    if inst == 'tgl':
        n_p = p+int(r[insts[p][1]])
        if n_p < len(insts) and n_p >= 0:
            if len(insts[n_p]) == 2:
                insts[n_p][0] = 'dec' if insts[n_p][0] == 'inc' else 'inc'
            elif len(insts[n_p]) == 3:
                insts[n_p][0] = 'cpy' if insts[n_p][0] == 'jnz' else 'jnz'

    if inst == 'cpy':
        r[insts[p][2]] = get_value(insts[p][1])
    elif inst == 'dec':
        r[insts[p][1]] -= 1
    elif inst == 'inc':
        r[insts[p][1]] += 1
    elif inst == 'mul':
        r[insts[p][3]] += get_value(insts[p][1])*get_value(insts[p][2])
    elif inst == 'jnz':
        if get_value(insts[p][1]) != 0:
            p += get_value(insts[p][2])
            continue
    elif inst == 'out':
        c = ''
        if get_value(insts[p][1]) != 0:
            c = chr(get_value(insts[p][1]))
        else:
            c = chr(r[insts[p][1]])
        text.append(c)
    else:
        print inst, 'unknown command'
    p+=1

strings =  ''.join(text)

def shift(seq, n):
    i = n % len(seq)
    return seq[-i:] + seq[:-i]

dim = (50,6)

l = [[0 for i in xrange(dim[0])] for j in xrange(dim[1])]

for c in [_ for _ in strings.split('\n') if _]:
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

for i in xrange(dim[1]):
    for j in xrange(dim[0]):
        if l[i][j] == 1:
            print '#',
        else:
            print ' ',
    print '\n',