import re

with open('5.in','r') as f:
    strings = f.readlines()

total = 0

for s in strings:

    i = 2
    one_apart = False

    while i < len(s) and not one_apart:
        one_apart = len(set(s[i-2:i+1])) and s[i-2:i+1][0] == s[i-2:i+1][-1]
        i+=1

    if not one_apart: continue

    pairs = []
    i = 0
    pair = False

    while i < len(s)-1:
        pairs.append(s[i:i+2])
        i+=1

    for p in pairs:
        ite = re.finditer(p,s)
        occur = [t.start() for t in ite]
        if len(occur) >= 2:
            for n in occur:
                for m in occur:
                    if n == m:
                        continue
                    if abs(n-m) > 1:
                        pair = True
                        break
                if pair:
                    break 

    if not pair: continue

    total += 1

print total