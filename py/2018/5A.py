chars = [chr(i)+chr(i).upper() for i in xrange(ord('a'), ord('z')+1)]

def reduce(s):
    changes = True
    while changes:
        changes = False
        for c in chars:
            l = len(s)
            s = s.replace(c, '')
            s = s.replace(c[::-1],'')
            if l != len(s):
                changes = True
    return s

print len(reduce(open('5.in').read()))
