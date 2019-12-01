with open('1.in', 'r') as f:
    path = [p.strip() for p in f.read().split(',')]

theta = 90
x = [0,0]

points = [[0,0]]

for p in path:

    direct = 0 if p[0] == 'R' else 1

    dist = int(p[1:])

    if theta == 0:
        [points.append([x[0],x[1]+((-1)**(not(direct)))*i]) for i in xrange(1,dist+1)]
        x[1] += ((-1)**(not(direct)))*dist
    elif theta == 90:
        [points.append([x[0]+((-1)**direct)*i,x[1]]) for i in xrange(1,dist+1)]
        x[0] += ((-1)**direct)*dist
    elif theta == 180:
        [points.append([x[0],x[1]+((-1)**(direct))*i]) for i in xrange(1,dist+1)]
        x[1] += ((-1)**direct)*dist
    elif theta == 270:
        [points.append([x[0]+((-1)**(not(direct)))*i,x[1]]) for i in xrange(1,dist+1)]
        x[0] += ((-1)**(not(direct)))*dist

    theta = (theta + ((-1)**(not(direct)))*90) % 360


for p in points:
    if sum([1 for l in points if l == p]) > 1:
        d = abs(p[0]) + abs(p[1])
        print p,'dist:',d
        break