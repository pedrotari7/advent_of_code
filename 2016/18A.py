with open('18.in') as f: line = f.read()

total = line.count('.')

for r in xrange(1,40):
	prev = '.'+line+'.'
	line =''.join('^' if prev[c-1]!=prev[c+1] else '.' for c in xrange(1,len(prev)-1))
	total += line.count('.')

print total