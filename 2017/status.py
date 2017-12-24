import requests
import json, sys, os
import html2text
from itertools import chain
from bs4 import BeautifulSoup as bs
from  datetime import datetime as dt
from datetime import timedelta
from colors import blue, yellow, red, green

def print_leaderbord(members):
    print ' '.ljust(28)+'  '.join(i for i in map(str,xrange(1,10)))+' '+' '.join(i for i in map(str,xrange(10,26)))+ '  Total  Diff   G' +'\n'+'-'*120
    for j, member in enumerate(sorted(members.itervalues(), key=lambda y:y['local_score'], reverse=True)):
        if j == 0: top = member['local_score']
        if member['stars'] and member['name']:
            print str(j+1).ljust(2, ' ') + ' ' + member['name'].ljust(24,' '),
            for i in map(str,xrange(1,26)):
                if i in member['completion_day_level']:
                    if len(member['completion_day_level'][i].keys()) == 1:
                        print blue('~ ', bg='black'),
                    elif len(member['completion_day_level'][i].keys()) == 2:
                        print yellow('* ', bg='black'),
                else:
                    print '  ',
            print str(member['local_score']).ljust(6,' '),
            print str(top-member['local_score']).ljust(6,' '),
            print member['global_score']

def print_problem(n,year,members):
    time_str = r"%Y-%m-%dT%H:%M:%S"
    print 'Problem', n.ljust(19),blue('  1st Star',bg='black'), yellow('    2nd Star',bg='black') + '\n' + '-'*51
    start_time = dt.strptime(year+'-12-' + n.zfill(2) + 'T00:00:00', time_str)

    data = []
    for member in members.itervalues():
        if n in member['completion_day_level']:
            t1,t2 = timedelta(days=1000), timedelta(days=1000)
            if '1' in member['completion_day_level'][n]:
                t1 = dt.strptime(member['completion_day_level'][n]['1']['get_star_ts'][:-5], time_str)-start_time
            if '2' in member['completion_day_level'][n]:
                t2 = dt.strptime(member['completion_day_level'][n]['2']['get_star_ts'][:-5], time_str)-start_time
            data.append((member, t1, t2))

    for j, (member, t1, t2) in enumerate(sorted(data, key=lambda x:(x[2],x[1]))):
            print str(j+1).ljust(2, ' ') + ' ' + member['name'].ljust(24,' '),
            if t1 != timedelta(days=1000):
                print ' ',str(t1).ljust(10, ' '),
            if t2 != timedelta(days=1000):
                print ' ', t2,
            print

def get_problem_input(n, event, cookie):
    if not os.path.exists(n+'.in'):
        link = 'https://adventofcode.com/' + event + '/day/' + n + '/input'
        data = requests.get(link, cookies=cookie).text
        if 'Not Found' in data:
            print red('Input not available!', bg='black')
        else:
            with open(n+'.in', 'w') as f:
                f.write(data.strip())
                print green('Data saved in Input file '+n+'.in!', bg='black')
    else:
        print red('Input file '+n+'.in'+' already exits!', bg='black')
    template = open('../template.py', 'r').read()
    for l in ['A','B']:
        if not os.path.exists(n+l+'.py'):
            with open(n+l+'.py', 'w') as f:
                f.write(template.format(n))
            print green('Python file '+n+l+'.py generated!', bg='black')
        else:
            print red('Python file '+n+l+'.py'+' already exits!', bg='black')


def colorify_text(text, sep, color, bg='black'):
    text = text.split(sep)
    for i in xrange(1,len(text),2):
        text[i] = eval(color+'(\''+ text[i]+'\')')
    return ' '.join(text)

def get_problem_description(n, event, cookie):
        h = html2text.HTML2Text()
        h.ignore_links = True
        h.ignore_images = True
        h.body_width = 100
        link = 'https://adventofcode.com/' + event + '/day/' + n + ''
        s = bs(requests.get(link, cookies=cookie).text)
        for article in s.find_all('article'):
            text = h.handle('<html>'+str(article).strip()+'</html>')
            text = colorify_text(text, '`', 'blue')
            print colorify_text(text, '_', 'yellow')

def get_leaderboard_info(event, private_id, cookie):
    link = 'https://adventofcode.com/' + event + '/leaderboard/private/view/' + private_id + '.json'
    return json.loads(requests.get(link, cookies=cookie).text)['members']

if __name__ == '__main__':
    event = '2017'
    private_id = '34481'
    #copy chrome://settings/cookies/detail?site=adventofcode.com session cookie content
    cookie = {'session':open('session.cookie').read()}

    if len(sys.argv)>1 and sys.argv[1].isdigit():
        if len(sys.argv) == 3:
            if sys.argv[2] == '-i':
                get_problem_input(sys.argv[1], event, cookie)
            elif sys.argv[2] == '-d':
                get_problem_description(sys.argv[1], event, cookie)
        else:
            members = get_leaderboard_info(event, private_id, cookie)
            print_problem(sys.argv[1],event, members)
    else:
        members = get_leaderboard_info(event, private_id, cookie)
        print_leaderbord(members)