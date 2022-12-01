#! /usr/local/bin/python3

import json
import os
import sys
from datetime import datetime as dt
from datetime import timedelta

import html2text
import requests
from bs4 import BeautifulSoup as bs
from colors import blue, green, red, yellow

event = '2022'

# private_id = '371692'   # current
# private_id = '34481'  # jesper
private_id = '318415'    # spotify

# copy chrome://settings/cookies/detail?site=adventofcode.com session cookie content
cookie = {'session': open('../../session.cookie').read()}


def update_local_points(leaderboard):
    for day in map(str, range(1, 26)):
        star_rank1, star_rank2 = [], []
        for member in leaderboard:
            if day in leaderboard[member]['completion_day_level']:
                if '1' in leaderboard[member]['completion_day_level'][day]:
                    star_rank1.append(
                        (int(leaderboard[member]['completion_day_level'][day]['1']['get_star_ts']), member))
                if '2' in leaderboard[member]['completion_day_level'][day]:
                    star_rank2.append(
                        (int(leaderboard[member]['completion_day_level'][day]['2']['get_star_ts']), member))

        for pos, r in enumerate(sorted(star_rank1)):
            leaderboard[r[1]]['completion_day_level'][str(
                day)]['1']['pts'] = str(len(leaderboard) - pos)
        for pos, r in enumerate(sorted(star_rank2)):
            leaderboard[r[1]]['completion_day_level'][str(
                day)]['2']['pts'] = str(len(leaderboard) - pos)

    for member in leaderboard:
        leaderboard[member]['local_score'] = 0
        for day in leaderboard[member]['completion_day_level']:
            for star in leaderboard[member]['completion_day_level'][day]:
                if (day == '6' and event == '2018'):
                    leaderboard[member]['local_score'] += 0
                else:
                    leaderboard[member]['local_score'] += int(
                        leaderboard[member]['completion_day_level'][day][star]['pts'])

    return leaderboard


def position_in_leaderboard(leaderboard, member, day):
    rank = {}
    for m in leaderboard:
        if day in m['completion_day_level'] and '2' in m['completion_day_level'][day]:
            rank[m['id']] = (int(m['completion_day_level'][day]
                                 ['2']['get_star_ts']), m['name'])

    rank = sorted(rank, key=rank.get)

    if member in rank:
        return str(rank.index(member) + 1)
    else:
        return ''


def print_leaderbord(members, mode='star'):
    print(' '.ljust(28)+'  '.join(i for i in map(str, range(1, 10)))+' ' +
          ' '.join(i for i in map(str, range(10, 26))) + '  Total  Diff   G' + '\n'+'-'*120)

    leaderboard_rank = sorted(
        members.values(), key=lambda y: y['local_score'], reverse=True)

    for j, member in enumerate(leaderboard_rank):
        if j == 0:
            top = member['local_score']
        if member['stars']:
            name = member['name'] if member['name'] else 'Anonymous'
            print(str(j+1).ljust(3, ' ') + ' ' + name.ljust(23, ' '), end=''),
            for day in map(str, range(1, 26)):
                if day in member['completion_day_level']:
                    if mode == 'star':
                        if len(member['completion_day_level'][day].keys()) == 1:
                            print(blue(' ~ ', bg='black'), end=''),
                        elif len(member['completion_day_level'][day].keys()) == 2:
                            print(yellow(' * ', bg='black'), end=''),
                    elif mode == 'pos':
                        pos = position_in_leaderboard(
                            leaderboard_rank, member['id'], day)
                        if pos:
                            if pos == '1':
                                print(yellow(pos.ljust(3, ' ')), end='')
                            elif pos in ['2', '3']:
                                print(blue(pos.ljust(3, ' '), bg='black'), end='')
                            else:
                                print(pos.ljust(3, ' '), end=''),
                else:
                    print('   ', end=''),
            print(str(member['local_score']).ljust(10, ' '), end='')
            print(str(top-member['local_score']).ljust(10, ' '), end='')
            print(member['global_score'])


def print_problem(n, members):
    time_str = r"%Y-%m-%dT%H:%M:%S"
    print('Problem', n.ljust(19), blue('  1st Star', bg='black'),
          yellow('    2nd Star', bg='black') + '\n' + '-'*51)
    start_time = dt.strptime(event+'-12-' + n.zfill(2) + 'T05:00:00', time_str)

    data = []
    for member in members.itervalues():
        if n in member['completion_day_level']:
            t1, t2 = timedelta(days=1000), timedelta(days=1000)
            if '1' in member['completion_day_level'][n]:
                t1 = dt.utcfromtimestamp(
                    int(member['completion_day_level'][n]['1']['get_star_ts'])) - start_time
            if '2' in member['completion_day_level'][n]:
                t2 = dt.utcfromtimestamp(
                    int(member['completion_day_level'][n]['2']['get_star_ts'])) - start_time
            data.append((member, t1, t2))

    for j, (member, t1, t2) in enumerate(sorted(data, key=lambda x: (x[2], x[1]))):
        name = member['name'] if member['name'] else 'Anonymous'
        print(str(j+1).ljust(2, ' ') + ' ' + name.ljust(24, ' '))
        if t1 != timedelta(days=1000):
            print(' ', str(t1).ljust(10, ' '))
        if t2 != timedelta(days=1000):
            print(' ', t2)
        print()


def get_problem_input(n):
    if not os.path.exists(n+'.in') or (os.path.exists(n+'.in') and not open(n+'.in').read().strip()):
        link = 'https://adventofcode.com/' + event + '/day/' + n + '/input'
        data = requests.get(link, cookies=cookie).text
        if "Please don't repeatedly request this endpoint before it unlocks!" in data:
            print(red('Input not available!', bg='black'))
        else:
            with open(n+'.in', 'w') as f:
                f.write(data.strip('\n'))
                print(green('Data saved in Input file '+n+'.in!', bg='black'))
    else:
        print(red('Input file '+n+'.in'+' already exits!', bg='black'))
    template = open('../template.js', 'r').read()
    for l in ['A', 'B']:
        if not os.path.exists(n+l+'.ts'):
            with open(n+l+'.ts', 'w') as f:
                f.write(template.format(n))
            print(green('Typescript file '+n+l+'.ts generated!', bg='black'))
        else:
            print(red('Typescript file '+n+l+'.ts'+' already exits!', bg='black'))


def colorify_text(text, sep, color, bg='black'):
    text = text.split(sep)
    print(text)
    for i in range(1, len(text), 2):
        text[i] = eval(color+'(\'' + text[i]+'\')')
    return ' '.join(text)


def get_problem_description(n):
    h = html2text.HTML2Text()
    h.ignore_links = True
    h.ignore_images = True
    h.body_width = 100
    link = 'https://adventofcode.com/' + event + '/day/' + n + ''
    s = bs(requests.get(link, cookies=cookie).text, features="html.parser")
    for article in s.find_all('article'):
        text = h.handle('<html>'+str(article).strip()+'</html>')
        text = colorify_text(text, '`', 'blue')
        print(colorify_text(text, '_', 'yellow'))


def get_leaderboard_info():
    link = 'https://adventofcode.com/' + event + \
        '/leaderboard/private/view/' + private_id + '.json'
    leaderboard = json.loads(requests.get(
        link, cookies=cookie).text)['members']
    leaderboard = update_local_points(leaderboard)
    for member in leaderboard:
        leaderboard[member]['id'] = member
    return leaderboard


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        if len(sys.argv) == 3:
            if sys.argv[2] == '-i':
                get_problem_input(sys.argv[1])
            elif sys.argv[2] == '-d':
                get_problem_description(sys.argv[1])
        else:
            members = get_leaderboard_info()
            print_problem(sys.argv[1], members)
    else:
        members = get_leaderboard_info()

        print_leaderbord(members, 'star')
        # print_leaderbord(members, 'pos')
