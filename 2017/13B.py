from itertools import count
a = eval('{'+open('13.in').read().replace('\n',',')+'}')
for c in count():
    if all((l+c)%((a[l]-1)*2) for l in a):
        break
print c