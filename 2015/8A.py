with open('8.in') as f:
    print(sum([len(line.strip()) - len(eval(line)) for line in f]))


