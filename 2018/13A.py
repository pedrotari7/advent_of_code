next_inter_dir = {'^': '<^>', 'v': '>v<', '>': '^>v', '<': 'v<^'}
next_turn_dir  = {'>':{'\\':'v','/':'^'},'<':{'\\':'^','/':'v'},'^':{'\\':'<','/':'>'},'v':{'\\':'>','/':'<'}}


track = dict()
cars = dict()
for y, line in enumerate(open('13.in')):
    for x, t in enumerate(line.strip('\n')):
        track[(x,y)] = t
        if t in '<>^v':
            cars[(x,y)] = {'dir':t, 'turn': 0}
            track[(x,y)] = '|-'[t in '<>']

def turn(pos, d, t):
    car = {'dir':d, 'turn': t}
    if track[pos] in '\\/':
        car['dir'] = next_turn_dir[d][track[pos]]
    elif track[pos] == '+':
        car['dir'] = next_inter_dir[d][t]
        car['turn'] = (t+1) % 3
    return car

def move_car(car):
    d, t = cars[car]['dir'], cars[car]['turn']
    del(cars[car])

    next_pos = (car[0]+(d=='>')-1*(d=='<') ,car[1]+(d=='v')-1*(d=='^'))

    if next_pos in cars:
        del cars[next_pos]
        return next_pos

    cars[next_pos] = turn(next_pos, d, t)


crashed = False

while not crashed and cars:
    for car in sorted(cars.keys()):
        crashed = move_car(car)
        if crashed:
            print 'crashed',crashed
            break

