operations = {
    'addr': 'r[a] + r[b]',
    'addi': 'r[a] + b',
    'mulr': 'r[a] * r[b]',
    'muli': 'r[a] * b',
    'banr': 'r[a] & r[b]',
    'bani': 'r[a] & b',
    'borr': 'r[a] | r[b]',
    'bori': 'r[a] | b',
    'setr': 'r[a]',
    'seti': 'a',
    'gtir': 'a > r[b]',
    'gtri': 'r[a] > b',
    'gtrr': 'r[a] > r[b]',
    'eqir': 'a == r[b]',
    'eqri': 'r[a] == b',
    'eqrr': 'r[a] == r[b]'
}

options = {op:set() for op in operations}

data, program = open('16.in').read().split('\n\n\n')

for i,inst in enumerate([_.split('\n') for _ in data.split('\n\n')]):
    count = 0
    before = eval(inst[0].split(': ')[1])
    op, a, b, c = map(int, inst[1].split())
    after = eval(inst[2].split(': ')[1])

    for fun in operations:
        r = before[::]
        r[c] = eval(operations[fun])
        if r == after:
            options[fun].add(op)
        else:
            if op in options[fun]:
                options[fun].remove(op)

def shake_options(opts):
    while not all(len(opts[_]) == 1 for _ in opts):
        for op in opts:
            if len(opts[op])  == 1:
                for other in opts:
                    if op == other: continue
                    if list(opts[op])[0] in opts[other]:
                        opts[other].remove(list(opts[op])[0])
    return {int(list(opts[_])[0]):_ for _ in opts}

print options
opts = shake_options(options)

r = [0, 0, 0, 0]

for op, a, b, c in [map(int,_.split()) for _ in program.strip().split('\n')]:
    r[c] = eval(operations[opts[op]])

print r[0]