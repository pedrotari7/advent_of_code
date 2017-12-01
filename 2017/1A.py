with open('1.in', 'r') as f:
    a = f.read()
    print sum([int(d) for i,d in enumerate(a) if d == a[(i+1)%len(a)]])