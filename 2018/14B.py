score = {(str(i),str(j)): str(int(i)+int(j)) for i in xrange(10) for j in xrange(10)}

a = open('14.in').read().strip()

rc = '37'

elf1, elf2 = 0, 1

while a not in rc[-len(a)-1:]:
    rc += score[(rc[elf1], rc[elf2])]
    elf1, elf2 = [(e+int(rc[e])+1) % len(rc) for e in [elf1,elf2]]

print len(rc) - len(a) - (1-rc[-len(a)-1:].index(a))