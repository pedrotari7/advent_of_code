from operator import itemgetter

with open('4.in') as f:
    total = 0

    for r in f.read().split('\n'):
        letters = ''.join(r.split('-')[:-1])
        room_check = r.split('-')[-1].split('[')[1].strip(']')

        a = sorted([(letters.count(l),l) for l in set(letters)], key=itemgetter(1))

        a = sorted(a, key=itemgetter(0), reverse=True)

        room_count = ''.join([l[1] for l in a][:5])

        if room_count == room_check:
            room_id = int(r.split('-')[-1].split('[')[0])
            total +=  room_id


print total