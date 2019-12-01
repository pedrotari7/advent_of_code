with open('23B.in','r') as f:
	insts = [s.split() for s in f]

p = 0

r = {'a':12,'b':0,'c':0,'d':0}

def get_value(v):
    try: return int(v)
    except: return r[v]

while p < len(insts) and p >= 0:
	inst = insts[p][0]

	if inst == 'tgl':
		n_p = p+int(r[insts[p][1]])
		if n_p < len(insts) and n_p >= 0:
			if len(insts[n_p]) == 2:
				insts[n_p][0] = 'dec' if insts[n_p][0] == 'inc' else 'inc'
			elif len(insts[n_p]) == 3:
				insts[n_p][0] = 'cpy' if insts[n_p][0] == 'jnz' else 'jnz'

	if inst == 'cpy':
		r[insts[p][2]] = get_value(insts[p][1])
	elif inst == 'dec':
		r[insts[p][1]] -= 1
	elif inst == 'inc':
		r[insts[p][1]] += 1
	elif inst == 'mul':
		r[insts[p][3]] += get_value(insts[p][1])*get_value(insts[p][2]) 
	elif inst == 'jnz':
		if get_value(insts[p][1]) != 0:
			p += get_value(insts[p][2])
			continue
	p+=1

print r['a']
