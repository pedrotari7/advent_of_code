with open ('20.in','r') as f:
	numbers = [map(int, l.split('-')) for l in f.read().split('\n')]

m,c = 0, 0

for r in sorted(numbers):
    if m < r[0]: c += r[0] - m

    m = max(m, r[1] + 1)

print c + 2**32 - m
