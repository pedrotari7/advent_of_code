with open ('21.in','r') as f:
    strings = f.read().split('\n')


w = list('abcdefgh')


# w = list('abcde')

# strings = """swap position 4 with position 0
# swap letter d with letter b
# reverse positions 0 through 4
# rotate left 1 step
# move position 1 to position 4
# move position 3 to position 0
# rotate based on position of letter b
# rotate based on position of letter d""".split('\n')


for s in strings:
    print ''.join(w), s
    d = s.split()
    if d.count('position') == 2 and 'swap' in d:
        w[int(d[5])], w[int(d[2])] = w[int(d[2])], w[int(d[5])]
    elif d.count('letter') == 2:
        for i,l in enumerate(w):
            if l == d[5]:
                w[i] = d[2]
            elif l == d[2]:
                w[i] = d[5]
    elif 'step' in d or 'steps' in d:
        if 'right' in d:
            n =  -1*(int(d[2])%len(w))
        elif 'left' in d:
            n =  int(d[2])%len(w)
        w = w[n:] + w[:n]

    elif 'position' in d and 'letter' in d:
        if d[-1] in w:
            ind = 1 + w.index(d[-1])
            if w.index(d[-1]) >= 4:
                ind+=1
        else:
            ind = 1
        n =  -1*(ind%len(w))

        w = w[n:] + w[:n]

    elif 'through' in d:
        n1 = int(d[2])
        n2 = int(d[4])

        n_w = w[:n1] + w[n1:n2+1][::-1] + w[n2+1:]

        w = n_w

        # if n2 != len(w)-1:
        #   n_w += n_w[n2]

    elif d.count('position') == 2 and 'move' in d:
        n1 = int(d[2])
        n2 = int(d[5])

        if n2 > n1:
            w = w[:n1] + w[n1+1:n2+1] + [w[n1]] + w[n2+1:]
        elif n2 < n1:
            w = w[:n2] + [w[n1]]  + w[n2:n1] + w[n1+1:]         





print ''.join(w)