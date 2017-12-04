import requests
import json
import sys
import datetime

event = '2017'
private_id = '34481'

link = 'https://adventofcode.com/' + event + '/leaderboard/private/view/' + private_id + '.json'

cookie = {'session':''}

j = json.loads(requests.get(link, cookies=cookie).text)

members = j['members']

def print_leaderbord():
    print ' '.ljust(28)+'  '.join(i for i in map(str,xrange(1,10)))+' '+' '.join(i for i in map(str,xrange(10,26)))+ '  Total' +'\n'+'-'*109

    for j, member in enumerate(sorted(members.itervalues(), key=lambda y:y['local_score'], reverse=True)):
        if member['stars'] > 0:
            print str(j+1).ljust(2, ' ') + ' ' + member['name'].ljust(24,' '),
            for i in map(str,xrange(1,26)):
                if i in member['completion_day_level']:
                    if len(member['completion_day_level'][i].keys()) == 1:
                        print '~ ',
                    elif len(member['completion_day_level'][i].keys()) == 2:
                        print '* ',
                else:
                    print '  ',
            print member['local_score']


def print_problem(n):
    print 'Problem', n.ljust(19),'  1st Star', '    2nd Star' + '\n' + '-'*50
    start_time = datetime.datetime.strptime('2017-12-' + n.zfill(2) + 'T00:00:00', "%Y-%m-%dT%H:%M:%S")

    data = []
    for member in members.itervalues(): 
        if n in member['completion_day_level']:
            t1,t2 = datetime.timedelta(days=1000), datetime.timedelta(days=1000)
            if '1' in member['completion_day_level'][n]:
                t1 = datetime.datetime.strptime(member['completion_day_level'][n]['1']['get_star_ts'][:-5], "%Y-%m-%dT%H:%M:%S") - start_time
            if '2' in member['completion_day_level'][n]:
                t2 =   datetime.datetime.strptime(member['completion_day_level'][n]['2']['get_star_ts'][:-5],  "%Y-%m-%dT%H:%M:%S") - start_time
            data.append((member, t1, t2))
 
    for j, (member, t1, t2) in enumerate(sorted(data, key=lambda x:(x[2],x[1]))):
            print str(j+1).ljust(2, ' ') + ' ' + member['name'].ljust(24,' '),
            if t1 != datetime.timedelta(days=1000):
                print ' ',str(t1).ljust(10, ' '),
            if t2 != datetime.timedelta(days=1000):
                print ' ', t2,
            print

if __name__ == '__main__':
    if len(sys.argv)==2 and sys.argv[1] == '-t':
        print_leaderbord()
    elif len(sys.argv)==2 and sys.argv[1].isdigit():
        print_problem(sys.argv[1])
    else:
        print 'No option provided'