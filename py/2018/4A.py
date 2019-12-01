from collections import defaultdict

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


best_guard = max(guards, key=guards.get)
best_minute = max(mins, key=lambda x: mins[x].count(best_guard))

print best_guard*best_minute





