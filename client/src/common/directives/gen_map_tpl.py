board = '<div class="board">\n'

for i in range(19*19):
    board += """  <span ng-class="[board[%d].type, board[%d].action]" class="box">
    {{board[%d].hp}}
    <span ng-show="board[%d].target"
          ng-class="['glyphicon-arrow-' + board[%d].target, 'text-' + (board[%d].action === 'move' ? 'primary' : 'danger')]"
          class="glyphicon"></span>
  </span>\n""" % (i, i, i, i, i, i)

board += '</div>\n'


with open('rgMap.tpl.html', 'w') as f:
    f.write(board)
