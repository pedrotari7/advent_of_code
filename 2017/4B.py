print sum(len(set(''.join(sorted(_)) for _ in i)) == len(i) for i in map(str.split,open('4.in')))
