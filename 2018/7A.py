requirements = [_.split() for _ in open('7.in')]

req = dict()
not_done = set()

for _ in requirements:
    if _[1] not in req: req[_[1]] = set()
    if _[7] not in req: req[_[7]] = set()
    req[_[7]].add(_[1])

not_done = sorted(req.keys())
done = []

while not_done:
    for sleigh in not_done:
        if all(s in done for s in req[sleigh]):
            done.append(sleigh)
            not_done.remove(sleigh)
            break

print ''.join(done)

