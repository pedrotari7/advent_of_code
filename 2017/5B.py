a = map(int,open('5.in'))
n,i,c = len(a),0,0

while i < n:
    prev = a[i]
    a[i]+=1 if prev < 3 else -1
    i += prev
    c+=1
print c