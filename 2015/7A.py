with open('7.in','r') as f:
	strings = f.read().split('\n')


wires = dict()

i = 0

def get_value(v):
	return wires[v] if v in wires else int(v)

def is_valid(v):
	return v in wires or v.isdigit()

while len(strings) > 0:
	if i >= len(strings): i = 0

	c = strings[i].split('->')
	w = c[1].strip()
	op = c[0].strip().split()
	if len(op) == 1 and is_valid(op[0]):
		wires[w] = get_value(op[0])
		strings.remove(strings[i])
	elif len(op) > 1:
		if 'AND' == op[1]:
			if is_valid(op[0]) and is_valid(op[2]):
				wires[w] = get_value(op[0]) & get_value(op[2])
				strings.remove(strings[i])
		elif 'OR' == op[1]:
			if is_valid(op[0]) and is_valid(op[2]):
				wires[w] = get_value(op[0]) | get_value(op[2])
				strings.remove(strings[i])
		elif 'LSHIFT' == op[1]:
			if is_valid(op[0]):
				wires[w] = get_value(op[0]) << get_value(op[2])
				strings.remove(strings[i])
		elif 'RSHIFT' == op[1]:
			if is_valid(op[0]):
				wires[w] = get_value(op[0]) >> get_value(op[2])
				strings.remove(strings[i])
		elif 'NOT' == op[0]:
			if is_valid(op[1]):
				wires[w] = ~get_value(op[1])
				strings.remove(strings[i])
	i+=1

print wires['a']