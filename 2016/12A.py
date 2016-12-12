with open('12.in','r') as f:
	strings = f.read()

p = 0

r = {'a':0,'b':0,'c':0,'d':0}


def get_value(v):
    try:
        return int(v)
    except:
        return r[v]

insts = [s.split() for s in strings.split('\n')]

while p < len(insts) and p >= 0:
	inst = insts[p][0]
	if inst == 'cpy':
		r[insts[p][2]] = get_value(insts[p][1])
	elif inst == 'dec':
		r[insts[p][1]] -= 1
	elif inst == 'inc':
		r[insts[p][1]] += 1
	elif inst == 'jnz':
		if get_value(insts[p][1]) != 0:
			p += get_value(insts[p][2])
			continue
	p+=1

print r['a']
