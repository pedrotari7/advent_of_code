total,g,ign,garb=0,0,False,False
for c in open('9.in').read():
    if ign or c == '!': ign = not ign;
    elif not garb:
        if c == '<': garb = True
        elif c == '{': g+=1
        elif c == '}': total+=g; g-=1 
    elif garb and c == '>': garb = False
print total