with open('2.in') as f:
    directions = f.read().split('\n')

m = [[1,2,3],[4,5,6],[7,8,9]]
x = [1,1]
num = []

for dire in directions:
    for d in dire:
        if d == 'U':
            if (x[1]-1 >= 0):
                x[1] -= 1
        elif d == 'D':
            if (x[1]+1 <= 2):
                x[1] += 1
        elif d == 'L':
            if (x[0]-1 >= 0):
                x[0] -= 1
        elif d == 'R':
            if (x[0]+1 <= 2):
                x[0] += 1
    num.append(str(m[x[1]][x[0]]))

print "num:",''.join(num)