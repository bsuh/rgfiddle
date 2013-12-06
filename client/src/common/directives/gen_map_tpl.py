board = '<div class="board">\n'

for i in range(19*19):
    board += """  <rg-box index="%d"></rg-box>\n""" % i

board += '</div>\n'


with open('rgMap.tpl.html', 'w') as f:
    f.write(board)
