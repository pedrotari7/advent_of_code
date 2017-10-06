m = ord('z') - ord('a')+1

with open('4.in') as f:
    for r in f:
        letters = ' '.join(r.split('-')[:-1])
        room_check = r.split('-')[-1].split('[')[1].strip(']')

        room_id = int(r.split('-')[-1].split('[')[0])

        new_str = ''

        for l in letters:
            if l != ' ':
                l = ord(l) + room_id%m
                if l > ord('z'):
                    l = ord('a') + l%ord('z')-1
                new_str += chr(l)
            else:
                new_str += l

        if 'northpole object storage' == new_str:
            print room_id
            break