a,d=eval('{'+open('13.in').read().replace('\n',',')+'}'),0
while any((l+d)%(a[l]*2-2)==0 for l in a):d+=1
print d