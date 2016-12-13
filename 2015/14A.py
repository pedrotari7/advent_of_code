with open('14.in') as f:
	info = f.read()


def calculate_dist(r,t):
	d = r['speed']*r['active']*(t/(r['active']+r['rest']))

	rem = (t%(r['active']+r['rest']))

	d += r['active']*r['speed'] if rem > r['active'] else rem*r['speed'] 

	return d

rd = dict()

for s in info.split('\n'):

	c = [l.split() for l in  s.split('seconds') if l!='']

	rd[c[0][0]] = {'speed':int(c[0][3]),'active':int(c[0][-1]),'rest':int(c[1][-1])}


t = 2503

print max([calculate_dist(rd[r],t) for r in rd])
  