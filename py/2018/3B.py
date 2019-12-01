from collections import Counter

count= dict()
board = dict()

for n,x,y,xlen,ylen in [map(int,_[1:].replace('@','').replace(':','').replace(',',' ').replace('x',' ').split()) for _ in open('3.in')]:
    for i in xrange(y,y+ylen):
        for j in xrange(x,x+xlen):
            count[n] = xlen*ylen
            board[(i,j)] = 'X' if (i,j) in board else n

c = Counter(board.values())

for n in count:
    if count[n] == c[n]:
        print n
        break
