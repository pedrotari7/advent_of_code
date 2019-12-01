requirements =[_.split() for _ in open('7.in')]

req = dict()
not_done = set()

for _ in requirements:
    if _[1] not in req: req[_[1]] = set()
    if _[7] not in req: req[_[7]] = set()
    req[_[7]].add(_[1])

not_done = sorted(req.keys())
done_time = {}
n_workers = 5
workers = [0 for _ in xrange(n_workers)]

current_time = -1

while not_done:
    current_time = max(current_time+1, min(workers))
    free_worker = workers.index(min(workers))
    for sleigh in not_done:
        if all(s in done_time and done_time[s] <= current_time for s in req[sleigh]):
            not_done.remove(sleigh)
            workers[free_worker] = 60 + current_time + 1 + ord(sleigh) - ord('A')
            done_time[sleigh] = workers[free_worker]

print ''.join(sorted(done_time, key=done_time.get))
print max(workers)



