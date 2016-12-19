import Queue, md5

move = [('U',-1,0),('D',1,0),('L',0,-1),('R',0,1)]

dim = 4

x,y,salt,path = (0,0,'mmsxrhfx','')

q = Queue.Queue()

while (x,y)!=(3,3):

    md = md5.new(salt+path).hexdigest()   
    for d,dx,dy in [move[i] for i,d in enumerate(md[:4]) if d in ['b','c','d','e','f']]:
        if (dim > x+dx >= 0) and (dim > y+dy >= 0):
            q.put((x+dx,y+dy, path+d))

    x, y, path = q.get()

print path