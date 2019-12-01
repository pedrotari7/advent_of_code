with open('3.in') as f:
  trig = [[int(s) for s in t.split()] for t in f.read().split('\n')]

final_trig = []

c0 = [t[0] for t in trig]
c1 = [t[1] for t in trig]
c2 = [t[2] for t in trig]

for i in xrange(0,len(c0),3):
  final_trig.append(c0[i:i+3])
  final_trig.append(c1[i:i+3])
  final_trig.append(c2[i:i+3])

valid = 0
for t in final_trig:
	valid += t[1]+t[0]>t[2] and t[1]+t[2]>t[0] and t[2]+t[0]>t[1]

print valid