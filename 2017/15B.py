def g(n, k, m=1):
    while 1:
        n = n*k%2147483647
        if n%m==0:
            yield n&(2**16-1)

a,b = g(783, 16807, 4), g(325, 48271, 8) 

print sum(next(a)==next(b) for _ in xrange(5*10**6))
