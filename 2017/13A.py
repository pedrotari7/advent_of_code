a = eval('{'+open('13.in').read().replace('\n',',')+'}')

print sum(l*a[l] for l in a if l%((a[l]-1)*2) == 0)