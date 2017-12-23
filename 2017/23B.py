b = 84*100 + 100000
c = b + 17000
h =0

for b in xrange(b,c+1,17):
    for d in xrange(2,int(b**0.5)):
        if b%d == 0:
            h+=1
            break
print h