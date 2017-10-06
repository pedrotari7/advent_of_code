def decomp(s):
    total = 0
    while '(' in s:
        total += s.index('(')

        s = s[s.index('(')+1:]

        dim,rep = map(int,s[:s.index(')')].split('x'))

        s = s[s.index(')')+1:]

        total += len(s[:dim])*rep

        s = s[dim:]

    return total + len(s)

with open('9.in') as f:
    print decomp(f.read())
