a = 289326

coords = [(1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1), (0, 1), (1, 1)]

x,y = (0,0)
dx,dy = (1,0)
M = {(x,y):1}

while M[(x, y)] < a:
    x, y = x+dx, y+dy
    M[(x, y)] = sum([M[(x+ox, y+oy)] for ox,oy in coords if (x+ox,y+oy) in M])
    if (x == y) or (x > 0 and x == 1-y) or (x < 0 and x == -y):
        dx, dy = -dy, dx

print M[(x, y)]