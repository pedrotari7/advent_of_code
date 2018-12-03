board = dict()
for n,x,y,xlen,ylen in [map(int,_[1:].replace('@','').replace(':','').replace(',',' ').replace('x',' ').split()) for _ in open('3.in')]:
    for i in xrange(y,y+ylen):
        for j in xrange(x,x+xlen):
            board[(i,j)] = 'X' if (i,j) in board else n

print board.values().count('X')