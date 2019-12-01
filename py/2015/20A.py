def factors(n):    
    return set(reduce(list.__add__, 
                ([i, n//i] for i in range(1, int(n**0.5) + 1) if n % i == 0)))


goal = 33100000

n = 1

while 1:
	if sum([10*l for l in factors(n)]) > goal:
		print n
		break
	n+=1


