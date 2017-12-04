with open('4.in', 'r') as f:
    print sum(1 for i in map(str.split,f) if len(set(''.join(sorted(_)) for _ in i)) == len(i))
