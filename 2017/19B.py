
def s(a,b):return tuple(x+y for x,y in zip(a,b))

def get_new_dire(a,c,dire):
    for d in [_ for _ in [(0,1),(0,-1),(1,0),(-1,0)] if (-1*_[0],-1*_[1])!=dire and _!=dire and s(c,_) in a]:
        if (d[0]==0 and a[s(c,d)] == '|') or (d[1]==0 and a[s(c,d)] == '-'):
            return d

a = {(j,i):v for i,l in enumerate(open('19.in')) for j,v in enumerate(l) if v.strip()}

c=min(a, key=lambda v: v[1])

d = (0,1)

p=0
while c in a:
    if a[c] == '+': d = get_new_dire(a,c,d)
    p+=1
    c=s(c,d)

print p