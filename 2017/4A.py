with open('4.in', 'r') as f:
    print sum(1 for i in map(str.split,f) if len(i)==len(set(i)))