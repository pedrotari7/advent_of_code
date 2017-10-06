with open('2.in') as f:
    directions = f.read().split('\n')

m = [[0,0,1,0,0],[0,2,3,4,0],[5,6,7,8,9],[0,'A','B','C',0],[0,0,'D',0,0]]

x = [1,1]

num = []

for dire in directions:
    for d in dire:
        if d == 'U':
            if (x[1]-1 >= 0 and m[x[1]-1][x[0]] != 0):
                x[1] -= 1
        elif d == 'D':
            if (x[1]+1 <= 4 and m[x[1]+1][x[0]] != 0):
                x[1] += 1
        elif d == 'L':
            if (x[0]-1 >= 0 and m[x[1]][x[0]-1] != 0):
                x[0] -= 1
        elif d == 'R':
            if (x[0]+1 <= 4 and m[x[1]][x[0]+1] != 0):
                x[0] += 1 
    num.append(str(m[x[1]][x[0]]))

print "num:",''.join(num)