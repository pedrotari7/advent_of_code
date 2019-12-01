from collections import defaultdict as df

reg = df(int)
for r,cmd,value,_,cr,op,cv in map(str.split,open('8.in')): 
    if eval('reg["'+cr+'"]'+op+'int('+cv+')'):
        if cmd == 'dec': reg[r] -= int(value)
        if cmd == 'inc': reg[r] += int(value)
print max(reg.values())
