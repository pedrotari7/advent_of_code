from collections import defaultdict as df
import string

reg = df(int)
last_played = 0
a = map(str.split,open('18.in'))
i = 0
while i >=0 or i < len(a):
    c = a[i]

    if len(c) == 3:
        if c[2] in string.ascii_lowercase: value = reg[c[2]]
        else: value = int(c[2])

    if c[0] == 'snd': last_played = reg[c[1]]
    if c[0] == 'set': reg[c[1]] = value
    if c[0] == 'add': reg[c[1]] += value
    if c[0] == 'mul': reg[c[1]] *= value
    if c[0] == 'mod': reg[c[1]] %= value
    if c[0] == 'rcv' and last_played: break
    if c[0] == 'jgz' and reg[c[1]]: i += value; continue

    i+=1

print last_played