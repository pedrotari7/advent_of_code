with open('5.in','r') as f:
	strings = f.readlines()

total = 0

for s in strings:
	if any([d in s for d in ['ab', 'cd', 'pq', 'xy']]):
		continue

	if sum([s.count(v) for v in 'aeiou']) < 3:
		continue

	if 0 not in [ord(t) - ord(a) for a, t in zip(s, s[1:])]:
		continue

	total += 1

print total