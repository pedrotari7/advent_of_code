def g(n, k):
    i = 0
    while i < 40*10**6:
        n = n*k%2147483647
        i+=1
        yield n&(2**16-1)

print sum(a==b for a,b in zip(g(783,16807),g(325,48271)))
