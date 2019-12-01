instructions="""jio a, +22
inc a
tpl a
tpl a
tpl a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
jmp +19
tpl a
tpl a
tpl a
tpl a
inc a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
tpl a
tpl a
jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7"""

(a,b,p) = (1,0,0)

insts = instructions.split('\n')

while p < len(insts) and p >= 0:
	inst = insts[p].split()[0]
	register = insts[p].split()[1].strip(',')

	if inst == 'hlf':
		exec(register+'//=2')
	elif inst == 'tpl':
		exec(register+'*=3')
	elif inst == 'inc':
		exec(register+'+=1')
	elif inst == 'jmp':
		p += int(register)
		continue
	elif inst == 'jie':
		offset = int(insts[p].split()[2])
		exec('p += offset if '+register+'%2==0 else 1')
		continue
	elif inst == 'jio':
		offset = int(insts[p].split()[2])
		exec('p += offset if '+register+'==1 else 1')
		continue
	p+=1

print b
