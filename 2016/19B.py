def baseN(num,b,numerals="012"):
    return ((num == 0) and numerals[0]) or (baseN(num // b, b, numerals).lstrip(numerals[0]) + numerals[num % b])

n = 3018458

print n-3**(len(baseN(n,3))-1)