from collections import Counter

two, three = 0, 0

for p in open('2.in'):
    c = Counter(p).values()
    two += 2 in c
    three += 3 in c

print two*three