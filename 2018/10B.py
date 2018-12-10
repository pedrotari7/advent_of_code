import re
def parse(data):
    return [{'x':x, 'y':y, 'vx':vx, 'vy':vy} for x,y,vx,vy in [map(int,re.findall(r'-?\d+', d)) for d in data.split('\n')]]


def draw_board(points):
    p = [(_['x'], _['y']) for _ in points]
    for j in xrange(min(p, key=lambda x: x[1])[1], max(p, key=lambda x: x[1])[1]+1):
        for i in xrange(min(p)[0], max(p)[0]+1):
            if (i,j) in p:
                print '#',
            else:
                print '.',
        print


def move_points(points, t=1):
    return [{'x':p['x']+p['vx']*t, 'y':p['y']+p['vy']*t, 'vx':p['vx'], 'vy':p['vy']} for p in points]


def calculate_area(points):
    minX, minY = min(points,key=lambda _: _['x'])['x'], min(points,key=lambda _: _['y'])['y']
    maxX, maxY = max(points,key=lambda _: _['x'])['x'], max(points,key=lambda _: _['y'])['y']
    return (maxX - minX)*(maxY - minY)

data = open('10.in').read()

points = parse(data)

minArea = (10e5,0)

for t in xrange(1,20000):
    points = move_points(points)
    area = calculate_area(points)
    if area < minArea[0]:
        minArea = (area, t)

print minArea

points = parse(data)

points = move_points(points, minArea[1])

draw_board(points)