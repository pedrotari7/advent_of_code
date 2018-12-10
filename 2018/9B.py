class Marble:
    def __init__(self, val):
        self.val = val
        self.next = self
        self.prev = self

    def insert(self, val):
        c = self.next
        new_marble = Marble(val)
        new_marble.prev = c
        new_marble.next = c.next
        c.next.prev = new_marble
        c.next = new_marble
        return new_marble

    def pop(self):
        c = self
        for _ in xrange(7):
            c = c.prev
        val  = c.val
        c.prev.next = c.next
        c.next.prev = c.prev
        c = c.next
        return (c, val)

a = open('9.in').read().split(' ')
n, last = map(int,(a[0], a[-2]))

score = {i: 0 for i in xrange(0, n)}
current = Marble(0)

for i in xrange(1, 100 * last + 1):
    if i % 23 == 0:
        current, remove_value = current.pop()
        score[i % n] += i + remove_value
    else:
        current = current.insert(i)

print max(score.values())