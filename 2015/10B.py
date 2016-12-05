
current_n = '1113222113'

for n in xrange(50):
	current_count = 0
	next_n = ''
	prev_d = current_n[0]
	for i,d in enumerate(current_n):
		if d == prev_d:
			current_count += 1
			if i == len(current_n)-1:
				next_n += str(current_count) + prev_d
		else:
			next_n += str(current_count) + prev_d
			current_count = 1
			prev_d = d
			if i == len(current_n)-1:
				next_n += str(current_count) + prev_d

	current_n = next_n


print len(current_n)
