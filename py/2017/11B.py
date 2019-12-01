x,y = 0,0
max_dist=0
for d in open('11.in').read().split(','):
    if d == 'n': y+=1
    elif d == 's': y-=1
    elif d == 'ne': y+=1;x+=1
    elif d == 'nw': x-=1
    elif d == 'se': x+=1
    elif d == 'sw': y-=1;x-=1
    max_dist = max(max_dist,abs(x)+abs(y))

print max_dist