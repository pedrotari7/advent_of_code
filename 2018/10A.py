import re
def parse(data):
    return [{'x':x, 'y':y, 'vx':vx, 'vy':vy} for x,y,vx,vy in [map(int,re.findall(r'-?\d+', d)) for d in data.split('\n')]]


def draw_board(stars):
    p = [(_['x'], _['y']) for _ in stars]
    for j in xrange(min(p, key=lambda x: x[1])[1], max(p, key=lambda x: x[1])[1]+1):
        for i in xrange(min(p)[0], max(p)[0]+1):
            if (i,j) in p:
                print '#',
            else:
                print '.',
        print


def move_points(stars, t=1):
    return [{'x':p['x']+p['vx']*t, 'y':p['y']+p['vy']*t, 'vx':p['vx'], 'vy':p['vy']} for p in stars]


def calculate_area(stars):
    minX, minY = min(stars,key=lambda _: _['x'])['x'], min(stars,key=lambda _: _['y'])['y']
    maxX, maxY = max(stars,key=lambda _: _['x'])['x'], max(stars,key=lambda _: _['y'])['y']
    return (maxX - minX)*(maxY - minY)

data = open('10.in').read()

stars = parse(data)

minArea = (10e5,0)

for t in xrange(1,20000):
    stars = move_points(stars)
    area = calculate_area(stars)
    if area < minArea[0]:
        minArea = (area, t)

print minArea

stars = parse(data)

stars = move_points(stars, minArea[1])

draw_board(stars)