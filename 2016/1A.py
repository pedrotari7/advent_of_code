with open('1.in', 'r') as f:
    path = [p.strip() for p in f.read().split(',')]

theta = 90
x = [0,0]

for p in path:
    direct = 0 if p[0] == 'R' else 1

    dist = int(p[1:])

    if theta == 0:
        x[1] += ((-1)**(not(direct)))*dist
    elif theta == 90:
        x[0] += ((-1)**direct)*dist
    elif theta == 180:
        x[1] += ((-1)**direct)*dist
    elif theta == 270:
        x[0] += ((-1)**(not(direct)))*dist

    theta = (theta + ((-1)**(not(direct)))*90) % 360

d = abs(x[0]) + abs(x[1])

print 'dist:',d

