import md5

(i,count) = (0,0)

password = ['']*8
while 1:
    key = 'reyedfim' + str(i)

    md = md5.new(key).hexdigest()

    if md[:5] == '00000':
        index = int(md[5],16)

        if  index < len(password) and password[index]=='':
            password[index] = md[6]
            count += 1
            if count == 8:
                break

    i+=1

print ''.join(password)