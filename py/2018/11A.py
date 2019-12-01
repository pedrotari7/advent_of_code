from collections import  defaultdict

s = int(open('11.in').read().strip())

def get_pl(x,y, serial):
    rid = x + 10
    pl = rid * y
    pl += serial
    pl *= rid
    return pl/100%10 - 5

def get_fuel(x,y,grid,size):
    return sum([sum(grid[x+i][y:y+size]) for i in xrange(size)])

grid = defaultdict(list)

for y in xrange(1,301):
    for x in xrange(1,301):
        grid[y].append(get_pl(x,y,s))

best = (-1000, (-1,-1))

size = 3

for y in xrange(1,302 - size):
    for x in xrange(1,302 - size):
        fuel = get_fuel(x,y,grid,size)
        if fuel > best[0]:
            best = (fuel, (y+1,x))

print ','.join(map(str,best[1]))

