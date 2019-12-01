with open('{}.in', 'r') as f:
    # a = f.read()
    # a = map(str.split, f)
    # a = [_ for _ in f]
    a =[_.split() for _ in f]

    print a


    # total = 0
    # for i,d in enumerate(a):
    #     total+=1
    # print total

    # print sum(i for i,d in enumerate(a))

