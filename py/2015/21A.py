
boss = dict()
player = dict()
store = dict()

store['weapons'] = {
'Dagger': {'cost':8,'damage':4 ,'armor':0},
'Shortsword':{'cost':10 ,'damage':5 ,'armor':0},
'Warhammer':{'cost':25 ,'damage':6 ,'armor':0},
'Longsword':{'cost':40 ,'damage':7 ,'armor':0},
'Greataxe':{'cost':74 ,'damage':8 ,'armor':0}
}

store['armor'] = {
'None':{'cost':0,'damage':0 ,'armor':0},
'Leather': {'cost':13,'damage':0 ,'armor':1},
'Chainmail':{'cost':31 ,'damage':0 ,'armor':2},
'Splintmail':{'cost':53 ,'damage':0 ,'armor':3},
'Bandedmail':{'cost':75 ,'damage':0 ,'armor':4},
'Platemail':{'cost':102 ,'damage':0 ,'armor':5}
}

store['rings'] = {
'None1':{'cost':0,'damage':0 ,'armor':0},
'None2':{'cost':0,'damage':0 ,'armor':0},
'Damage1': {'cost':25,'damage':1 ,'armor':0},
'Damage2':{'cost':50 ,'damage':2 ,'armor':0},
'Damage3':{'cost':100 ,'damage':3 ,'armor':0},
'Defense1':{'cost':20 ,'damage':0 ,'armor':1},
'Defense2':{'cost':40 ,'damage':0 ,'armor':2},
'Defense3':{'cost':80 ,'damage':0 ,'armor':3}
}


import itertools

best = 2**30

for m in itertools.product(store['weapons'],store['armor'],itertools.combinations(store['rings'],2)):

	cost = store['weapons'][m[0]]['cost'] + store['armor'][m[1]]['cost'] + store['rings'][m[2][0]]['cost'] + store['rings'][m[2][1]]['cost']

	player['hit'] = 100
	player['damage'] = store['weapons'][m[0]]['damage'] + store['armor'][m[1]]['damage'] + store['rings'][m[2][0]]['damage'] + store['rings'][m[2][1]]['damage']
	player['armor'] = store['weapons'][m[0]]['armor'] + store['armor'][m[1]]['armor'] + store['rings'][m[2][0]]['armor'] + store['rings'][m[2][1]]['armor']

	boss = {'hit':104,'damage':8,'armor':1}

	if cost < best:

		player_turn = True

		while boss['hit'] > 0 and  player['hit'] >0:
			if player_turn:
				boss['hit'] -= 1 + max((player['damage'] - boss['armor']-1),0)
			else:
				player['hit'] -= 1 + max((boss['damage'] - player['armor']-1),0)

			player_turn = not(player_turn)


		if player['hit'] > 0:
			best = min(best,cost)


print best


