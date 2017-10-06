def is_valid(st):
	size = 3
	v = []
	for i in xrange(len(st)-(size-1)):
		t = st[i:i+size]
		if len(set(t)) == 2 and t == t[::-1]:
			v.append(t)
	return v

with open('7.in') as f:
	total = 0
	for s in f:
		s = s.replace(']','[').split('[')
		supernet = sum([is_valid(p) for p in s[::2]],[])
		hypernet = sum([is_valid(p) for p in s[1::2]],[])

		if any([any([m!=ele and set(ele)==set(m) for m in hypernet]) for ele in supernet]):
			total += 1

	print total
