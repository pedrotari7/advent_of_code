with open('3.in') as f:
  trig = [[int(s) for s in t.split()] for t in f.read().split('\n')]

valid = 0

for t in trig:
  valid += t[1]+t[0]>t[2] and t[1]+t[2]>t[0] and t[2]+t[0]>t[1]

print valid