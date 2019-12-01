with open('1.in', 'r') as f:
    a = f.read()
    step = len(a) / 2
    print sum([int(d) for i,d in enumerate(a) if d == a[(i+step)%len(a)]])