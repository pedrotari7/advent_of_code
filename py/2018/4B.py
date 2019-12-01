from collections import defaultdict, Counter

guards = defaultdict(int)
mins = defaultdict(list)

a = sorted([_.replace('[','').replace(']','').replace('#','').split() for _ in open('4.in')])

a = [ [int(_[1].split(':')[1])] + _[2:] for _ in a]

current,start = 0, 0

for line in a:
    if 'Guard' in line:
        current = int(line[2])
    elif 'falls'in line:
        start = line[0]
    elif 'wakes'in line:
        end = line[0]
        guards[current]+= end-start
        for i in xrange(start,end):
            mins[i].append(current)

c = [list(sorted(Counter(mins[i]).items(),key=lambda x: x[1], reverse=True)[0])[::-1] + [i] for i in mins]

best_guard = max(c)

print best_guard[1]*best_guard[2]