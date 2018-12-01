from itertools import cycle

with open('1.in', 'r') as f:

    current = 0
    freq = set([current])

    for fr in cycle(int(_.strip()) for _ in f):
        current += fr

        if current in freq:
            break

        freq.add(current)

print(current)


