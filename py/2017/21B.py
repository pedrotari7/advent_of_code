def rotate(s):return [''.join(_) for _ in zip(*s[::-1])]
def flip(s):s[0],s[2] = s[2],s[0]; return s
a = dict()
for _ in open('21.in'):
    r = _.strip('\n').split(' => ')
    a[r[0]] = r[1].split('/')

m = ['.#.','..#','###']

for _ in xrange(18):
    if len(m)%2 == 0: s = 2
    elif len(m)%3 == 0: s = 3

    new_m = []

    for i in xrange(0,len(m),s):
        for j in xrange(0,len(m),s):
            c = [l[j:j+s] for l in m[i:i+s]]
            k = 0
            while '/'.join(c) not in a:
                if k==4:k = 0; c = flip(c); continue
                c = rotate(c)
                k+=1

            for r,rs in enumerate(a['/'.join(c)]):
                if (i/s)*len(rs)+r >= len(new_m):
                    new_m.append('')
                new_m[(i/s)*len(rs)+r] += rs
    m = new_m

print ''.join(m).count('#')