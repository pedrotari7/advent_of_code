import md5

i = 0
while 1:

	key = 'ckczppom' + str(i)

	md = md5.new(key).hexdigest()

	if md[:6] == '000000':
		break

	i+=1

print i