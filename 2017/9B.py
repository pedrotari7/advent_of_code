total,ign,garb=0,False,False
for c in open('9.in').read():
    if ign or c == '!': ign = not ign;
    elif not garb and c == '<': garb = True
    elif garb and c == '>': garb = False
    elif garb: total+=1
print total