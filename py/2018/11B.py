from collections import  defaultdict
import time

start = time.time()
s = int(open('11.in').read().strip())

def get_pl(x,y, serial):
    rid = x + 10
    pl = rid * y
    pl += serial
    pl *= rid
    return pl/100%10 - 5

def get_fuel(x,y,grid,size):
    return sum(sum(grid[x+i][y:y+size]) for i in xrange(size))

grid = defaultdict(list)

for x in xrange(1,300+1):
    for y in xrange(1,300+1):
        grid[x].append(get_pl(x,y,s))

best = (-1, (-1,-1,-1))

for size in xrange (1,300+1):
    for x in xrange(1,302-size):
        for y in xrange(1,302-size):
            fuel = get_fuel(x,y,grid,size)
            if fuel > best[0]:
                best = (fuel, (x,y+1,size))
                print 'new best:', ','.join(map(str,best[1]))


print ','.join(map(str,best[1]))