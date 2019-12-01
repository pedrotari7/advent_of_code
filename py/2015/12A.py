import json

total = 0

def walk_json(ele):
	global total
	if isinstance(ele,dict):
		for e in ele:
			walk_json(ele[e])

	elif isinstance(ele,list):
		for e in ele:
			walk_json(e)
	else:
		if isinstance(ele,int):
			total += ele

with open('12.in') as f:
	walk_json(eval(f.read()))
	print total