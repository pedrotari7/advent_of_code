import Queue

num = 1364

def is_free(x,y):
    return bin(x*x + 3*x + 2*x*y + y + y*y + num).count('1')%2==0

x,y = (1,1)
start = (1,1)
fim = (31,39)
steps = 0

v = set()

q = Queue.Queue()

while (x,y) != fim:
    v.add((x,y))

    for a,b in [(x+1,y),(x-1,y),(x,y+1),(x,y-1)]:
        if a >= 0 and b >= 0 and is_free(a,b) and (a,b) not in v:
            q.put((a,b, steps+1))

    x, y, steps = q.get()

print steps