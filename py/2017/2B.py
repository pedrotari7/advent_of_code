with open('2.in', 'r') as f:
    a = [[int(_) for _ in b.split('\t')] for b in f.read().split('\n')]

    print sum(sum([sum([max(n,m)/min(n,m) for m in row[i+1:] if max(n,m)%min(n,m)==0]) for i,n in enumerate(row)]) for row in a)