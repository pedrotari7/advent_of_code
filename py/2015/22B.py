
import Queue, copy

state = dict()
state['player'] = {'hit':50,'mana':500,'armor':0,'spent':0}
state['boss'] = {'hit': 58,'damage':9}
state['spells'] = {}
state['player_turn'] = True
state['seq'] = []

effects = dict()
effects['missile'] = {'cost':53,'damage':4,'hit':0,'mana':0,'duration':0,'armor':0}
effects['drain'] = {'cost':73,'damage':2,'hit':2,'mana':0,'duration':0,'armor':0}
effects['shield'] = {'cost':113,'damage':0,'hit':0,'mana':0,'duration':6,'armor':7}
effects['poison'] = {'cost':173,'damage':3,'hit':0,'mana':0,'duration':6,'armor':0}
effects['recharge'] = {'cost':229,'damage':0,'hit':0,'mana':101,'duration':5,'armor':0}

best = state['player']['mana']**10

q = Queue.Queue()

q.put(state)

while not q.empty():

	s = q.get()

	if s['player']['hit'] <= 0 or s['player']['spent'] > best:
		continue
	if s['boss']['hit'] <= 0:
		if best > s['player']['spent']:
			best = s['player']['spent']
			print best
		continue


	for active in s['spells']:
			s['boss']['hit'] -= effects[active]['damage']
			s['player']['mana'] += effects[active]['mana']

			s['spells'][active] -= 1

	for to_delete in [d for d in s['spells'] if s['spells'][d] == 0]:
		del s['spells'][to_delete]

		if to_delete == 'shield':
			s['player']['armor'] = 0


	if s['player_turn']:
		s['player']['hit'] -= 1
		s['player_turn'] = not s['player_turn']
		for spell in effects:
			if spell not in s['spells'] and effects[spell]['cost'] <= s['player']['mana']:
				cs = copy.deepcopy(s)

				if effects[spell]['duration'] > 0:
					cs['spells'][spell] = effects[spell]['duration']
					if spell == 'shield':
						cs['player']['armor'] = effects[spell]['armor']
				else:
					
					cs['boss']['hit'] -= effects[spell]['damage']
					cs['player']['hit'] += effects[spell]['hit']


				cs['player']['spent'] += effects[spell]['cost']
				cs['player']['mana'] -= effects[spell]['cost']
				cs['seq'].append((spell,cs['player']['spent'],cs['player']['hit'],cs['boss']['hit'],cs['player']['armor']))
				q.put(cs)
	else:
		s['player_turn'] = not s['player_turn']
		s['player']['hit'] -= max(1,s['boss']['damage']-s['player']['armor'])
		q.put(s)


print best
