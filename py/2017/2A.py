with open('2.in', 'r') as f:
    a = [[int(_) for _ in b.split('\t')] for b in f.read().split('\n')]

    print sum(max(row)-min(row) for row in a)