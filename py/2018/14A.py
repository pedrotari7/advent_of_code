score = {(str(i),str(j)): str(int(i)+int(j)) for i in xrange(10) for j in xrange(10)}

a = int(open('14.in').read().strip())
rc = '37'

elf1, elf2 = 0, 1

while len(rc) < a + 10:
    rc += score[(rc[elf1], rc[elf2])]
    elf1, elf2 = [(e+int(rc[e])+1) % len(rc) for e in [elf1,elf2]]

print rc[-10:]