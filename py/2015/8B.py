with open('8.in') as f:
    print(sum([line.strip().count('\\') + line.strip().count('"') + 2 for line in f]))