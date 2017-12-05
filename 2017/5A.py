a = map(int,map(str.strip,open('5.in')))
n,i,c = len(a),0,0

while i < n:
    a[i]+=1
    i+=a[i]-1
    c+=1
print c
