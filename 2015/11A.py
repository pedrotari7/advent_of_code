import re

def is_valid(p):
	if any([l in p for l in ['i','o','l']]):
		return False

	i,pairs = 1,0

	while i < len(p):
		if p[i] == p[i-1]:
			pairs += 1
			i+=1
		i+=1

	if pairs < 2:
		return False

	i,count = 1,0

	while i < len(p):
		if ord(p[i]) == ord(p[i-1])+1:
			count += 1
			if count == 2:
				break
		else:
			count = 0
		i+=1

	if count != 2:
		return False

	return True

def next_password(password):

	s = [ord(p) for p in password]

	cur = 1
	i = len(password)-1

	while cur == 1:
		if s[i]+1 > ord('z'):
			s[i] = ord('a')
			i-=1
		else:
			s[i] += 1
			cur = 0
			break

	return ''.join([chr(p) for p in s])

password = 'vzbxxyzz'

while not is_valid(password):
	password = next_password(password)

print password