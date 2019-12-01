from collections import defaultdict as df
import string

reg = df(int)
total = 0
a = map(str.split,open('23.in'))
i = 0
while i >=0 and i < len(a):
    c = a[i]

    if len(c) == 3:
        if c[2] in string.ascii_lowercase: value = reg[c[2]]
        else: value = int(c[2])

    if c[0] == 'set': reg[c[1]] = value
    elif c[0] == 'sub': reg[c[1]] -= value
    elif c[0] == 'mul': reg[c[1]] *= value; total+=1
    elif c[0] == 'jnz':
        if c[1] in string.ascii_lowercase: j = reg[c[1]]
        else: j = int(c[1])
        if j:
            i+=value
            continue
    i+=1

print total