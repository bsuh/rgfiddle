board = '<div class="board">\n'

for i in range(19*19):
    board += """  <span ng-class="board[%d].type" class="box">
    {{board[%d].hp}}
  </span>\n""" % (i, i)

board += '</div>\n'


with open('rgMap.tpl.html', 'w') as f:
    f.write(board)
