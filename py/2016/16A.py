
def new_data(a,n):
	while (len(a)<n):
		a += '0'+''.join('1' if x == '0' else '0' for x in a[::-1])

	return a[:n]	


def get_checksum(d):
	return ''.join(['1' if d[i]==d[i+1] else '0' for  i in xrange(0,len(d)-1,2)])

	
data = new_data('00111101111101000',272)
checksum = get_checksum(data)

while len(checksum)%2==0:
	checksum = get_checksum(checksum)

print "checksum: " + str(checksum)
