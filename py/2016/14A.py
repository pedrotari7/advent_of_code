import md5

def is_valid(k,ind):
	for i in xrange(len(k)-2):
		if len(set(k[i:i+3])) == 1:
			return [(k[i],ind)]
	return []

def has_five(k,pos):
	return [p for p in pos if p[0]*5 in k]


def clean_p(pos,ind):
	return [i for i in pos if ind <= i[1]+1000]

valid = []
salt = 'zpqevtbw'
total,i,final = 0,0,0

while final == 0:
	key = salt + str(i)

	md = md5.new(key).hexdigest()

	res = has_five(md,valid)

	valid += is_valid(md,i)

	if res != []:
		for r in res:
			total += 1
			if total == 64:
				final = r
				break

	valid = clean_p(valid,i)

	i+=1


print final[1]