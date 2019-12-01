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

data, _ = open('16.in').read().split('\n\n\n')

total = 0

for i,inst in enumerate([_.split('\n') for _ in data.split('\n\n')]):
    count = 0
    before = eval(inst[0].split(': ')[1])
    op, a, b, c = map(int, inst[1].split())
    after = eval(inst[2].split(': ')[1])

    for fun in operations:
        r = before[::]
        r[c] = eval(operations[fun])
        count += r == after

    total += count >= 3

print total


