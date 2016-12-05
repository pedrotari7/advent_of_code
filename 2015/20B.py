def factors(n):    
    return set(reduce(list.__add__, 
                ([i, n//i] for i in range(1, int(n**0.5) + 1) if n % i == 0)))


goal = 33100000

n = 2600000

while 1:
	presents = sum([11*l for l in factors(n) if 50*l<=n])
	print n,presents
	if  presents >= goal:
		print n, presents
		break
	n+=1

