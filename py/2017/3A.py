a = 289326

x,y = (0,0)
dx,dy = (1,0)
i = 1

while i!=a:
    i+=1
    x,y = x+dx,y+dy
    if (x == y) or (x > 0 and x == 1-y) or (x < 0 and x == -y):
        dx,dy=-dy,dx

print abs(x)+abs(y)