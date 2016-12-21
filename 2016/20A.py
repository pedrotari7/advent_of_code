with open ('20.in','r') as f:
	numbers = [map(int, l.split('-')) for l in f.read().split('\n')]

m = 0

for r in sorted(numbers):
	if r[0] > m and r[1] > m:
		break
	elif r[0] <= m and r[1] >= m:
		m = r[1]+1

print m
