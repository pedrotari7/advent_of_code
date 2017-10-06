import md5

i = 0
password = ''

while 1:
    key = 'reyedfim' + str(i)

    md = md5.new(key).hexdigest()

    if md[:5] == '00000':
        password += md[5]
        if len(password) == 8:
            break
    i+=1

print password