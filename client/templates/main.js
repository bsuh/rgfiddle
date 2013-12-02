angular.module('templates-main', ['/client/src/app/robots/editor/editor.tpl.html', '/client/src/app/robots/match/match.tpl.html', '/client/src/app/robots/robots.tpl.html', '/client/src/common/directives/rgMap.tpl.html']);

angular.module("/client/src/app/robots/editor/editor.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/editor/editor.tpl.html",
    "<script type=\"text/ng-template\" id=\"/client/vendor/src/app/robots/editor/codemirror.tpl.html\">\n" +
    "  <textarea ui-codemirror=\"codeMirrorOptions(robot.code)\" ng-model=\"robot.code\"></textarea>\n" +
    "</script>\n" +
    "\n" +
    "<form name=\"robotForm\" class=\"form-inline\" novalidate>\n" +
    "  <div class=\"form-group\" ng-class=\"{ 'has-error': robotForm.robotName.$dirty && !robotForm.robotName.$valid }\">\n" +
    "    <input type=\"text\" ng-model=\"robot.name\"\n" +
    "           ng-minlength=\"2\" ng-maxlength=\"20\"\n" +
    "           keep-model-value=\"\"\n" +
    "           name=\"robotName\" required class=\"form-control\" />\n" +
    "  </div>\n" +
    "  <button ng-click=\"updateRobot($index)\"\n" +
    "          class=\"btn btn-default\">Save</button>\n" +
    "  <button ng-if=\"!$first\" ng-click=\"updateRobot($index, true)\"\n" +
    "          class=\"btn btn-danger\">Delete</button>\n" +
    "</form>\n" +
    "\n" +
    "<!-- some hacky shit to make ui codemirror work properly w/ ng-repeat -->\n" +
    "<div ng-if=\"robot.active\" ng-include=\"'/client/vendor/src/app/robots/editor/codemirror.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("/client/src/app/robots/match/match.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/match/match.tpl.html",
    "<div ng-controller=\"MatchCtrl\">\n" +
    "  <p class=\"lead row\">\n" +
    "    <span class=\"text-danger\">{{robots[$index].name}}</span> vs\n" +
    "    <span class=\"text-primary\">{{robots[opponent.index].name}}</span>\n" +
    "  </p>\n" +
    "  \n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"btn-group\" ng-init=\"opponent.index = 0\">\n" +
    "      <button class=\"btn btn-default dropdown-toggle\">\n" +
    "        Select opponent&nbsp;<span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\">\n" +
    "        <li ng-repeat=\"robot in robots\">\n" +
    "          <a ng-click=\"opponent.index = $index\">{{robot.name}}</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <button ng-click=\"runMatch($index, opponent.index)\"\n" +
    "            class=\"btn btn-primary\">Run match</button>\n" +
    "    <i ng-if=\"statusClasses\" ng-class=\"statusClasses\" class=\"fa\"></i>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div ng-if=\"history\">\n" +
    "    <rg-map board=\"history[match.turn].board\" class=\"row\"></rg-map>\n" +
    "    \n" +
    "    <div class=\"row\">\n" +
    "      <input type=\"range\" ng-model=\"match.turn\"\n" +
    "             min=\"0\" max=\"{{history.length-1}}\" step=\"1\" value=\"0\"/>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"row\">\n" +
    "      Turn: {{match.turn}}\n" +
    "      <span class=\"text-danger\">\n" +
    "        {{match.player1}}: {{history[match.turn].scores[0]}}\n" +
    "      </span>\n" +
    "      <span class=\"text-primary\">\n" +
    "        {{match.player2}}: {{history[match.turn].scores[1]}}\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/client/src/app/robots/robots.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/robots.tpl.html",
    "<div ng-controller=\"RobotsCtrl\" class=\"row\">\n" +
    "  <tabset ng-init=\"getRobots()\">\n" +
    "    <tab ng-repeat=\"robot in robots\" active=\"robot.active\">\n" +
    "      <tab-heading ng-switch=\"!!$first\">\n" +
    "        <div ng-switch-when=\"false\">\n" +
    "          {{robot.name}}\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "          <span class=\"glyphicon glyphicon-plus\"></span>&nbsp;New Robot\n" +
    "        </div>\n" +
    "      </tab-heading>\n" +
    "      <div class=\"col-xs-12\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "          <!-- left column with code mirror -->\n" +
    "          <div class=\"col-lg-8\">\n" +
    "            <div ng-include=\"'/client/src/app/robots/editor/editor.tpl.html'\"></div>\n" +
    "          </div>\n" +
    "\n" +
    "          <!-- right column with game map -->\n" +
    "          <div class=\"col-lg-4\">\n" +
    "            <div ng-include=\"'/client/src/app/robots/match/match.tpl.html'\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/client/src/common/directives/rgMap.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/common/directives/rgMap.tpl.html",
    "<div class=\"board\">\n" +
    "  <span ng-class=\"[board[0].type, board[0].action]\" class=\"box\">\n" +
    "    {{board[0].hp}}\n" +
    "    <span ng-show=\"board[0].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[0].target, 'text-' + (board[0].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[1].type, board[1].action]\" class=\"box\">\n" +
    "    {{board[1].hp}}\n" +
    "    <span ng-show=\"board[1].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[1].target, 'text-' + (board[1].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[2].type, board[2].action]\" class=\"box\">\n" +
    "    {{board[2].hp}}\n" +
    "    <span ng-show=\"board[2].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[2].target, 'text-' + (board[2].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[3].type, board[3].action]\" class=\"box\">\n" +
    "    {{board[3].hp}}\n" +
    "    <span ng-show=\"board[3].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[3].target, 'text-' + (board[3].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[4].type, board[4].action]\" class=\"box\">\n" +
    "    {{board[4].hp}}\n" +
    "    <span ng-show=\"board[4].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[4].target, 'text-' + (board[4].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[5].type, board[5].action]\" class=\"box\">\n" +
    "    {{board[5].hp}}\n" +
    "    <span ng-show=\"board[5].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[5].target, 'text-' + (board[5].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[6].type, board[6].action]\" class=\"box\">\n" +
    "    {{board[6].hp}}\n" +
    "    <span ng-show=\"board[6].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[6].target, 'text-' + (board[6].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[7].type, board[7].action]\" class=\"box\">\n" +
    "    {{board[7].hp}}\n" +
    "    <span ng-show=\"board[7].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[7].target, 'text-' + (board[7].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[8].type, board[8].action]\" class=\"box\">\n" +
    "    {{board[8].hp}}\n" +
    "    <span ng-show=\"board[8].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[8].target, 'text-' + (board[8].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[9].type, board[9].action]\" class=\"box\">\n" +
    "    {{board[9].hp}}\n" +
    "    <span ng-show=\"board[9].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[9].target, 'text-' + (board[9].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[10].type, board[10].action]\" class=\"box\">\n" +
    "    {{board[10].hp}}\n" +
    "    <span ng-show=\"board[10].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[10].target, 'text-' + (board[10].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[11].type, board[11].action]\" class=\"box\">\n" +
    "    {{board[11].hp}}\n" +
    "    <span ng-show=\"board[11].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[11].target, 'text-' + (board[11].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[12].type, board[12].action]\" class=\"box\">\n" +
    "    {{board[12].hp}}\n" +
    "    <span ng-show=\"board[12].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[12].target, 'text-' + (board[12].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[13].type, board[13].action]\" class=\"box\">\n" +
    "    {{board[13].hp}}\n" +
    "    <span ng-show=\"board[13].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[13].target, 'text-' + (board[13].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[14].type, board[14].action]\" class=\"box\">\n" +
    "    {{board[14].hp}}\n" +
    "    <span ng-show=\"board[14].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[14].target, 'text-' + (board[14].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[15].type, board[15].action]\" class=\"box\">\n" +
    "    {{board[15].hp}}\n" +
    "    <span ng-show=\"board[15].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[15].target, 'text-' + (board[15].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[16].type, board[16].action]\" class=\"box\">\n" +
    "    {{board[16].hp}}\n" +
    "    <span ng-show=\"board[16].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[16].target, 'text-' + (board[16].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[17].type, board[17].action]\" class=\"box\">\n" +
    "    {{board[17].hp}}\n" +
    "    <span ng-show=\"board[17].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[17].target, 'text-' + (board[17].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[18].type, board[18].action]\" class=\"box\">\n" +
    "    {{board[18].hp}}\n" +
    "    <span ng-show=\"board[18].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[18].target, 'text-' + (board[18].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[19].type, board[19].action]\" class=\"box\">\n" +
    "    {{board[19].hp}}\n" +
    "    <span ng-show=\"board[19].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[19].target, 'text-' + (board[19].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[20].type, board[20].action]\" class=\"box\">\n" +
    "    {{board[20].hp}}\n" +
    "    <span ng-show=\"board[20].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[20].target, 'text-' + (board[20].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[21].type, board[21].action]\" class=\"box\">\n" +
    "    {{board[21].hp}}\n" +
    "    <span ng-show=\"board[21].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[21].target, 'text-' + (board[21].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[22].type, board[22].action]\" class=\"box\">\n" +
    "    {{board[22].hp}}\n" +
    "    <span ng-show=\"board[22].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[22].target, 'text-' + (board[22].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[23].type, board[23].action]\" class=\"box\">\n" +
    "    {{board[23].hp}}\n" +
    "    <span ng-show=\"board[23].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[23].target, 'text-' + (board[23].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[24].type, board[24].action]\" class=\"box\">\n" +
    "    {{board[24].hp}}\n" +
    "    <span ng-show=\"board[24].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[24].target, 'text-' + (board[24].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[25].type, board[25].action]\" class=\"box\">\n" +
    "    {{board[25].hp}}\n" +
    "    <span ng-show=\"board[25].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[25].target, 'text-' + (board[25].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[26].type, board[26].action]\" class=\"box\">\n" +
    "    {{board[26].hp}}\n" +
    "    <span ng-show=\"board[26].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[26].target, 'text-' + (board[26].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[27].type, board[27].action]\" class=\"box\">\n" +
    "    {{board[27].hp}}\n" +
    "    <span ng-show=\"board[27].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[27].target, 'text-' + (board[27].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[28].type, board[28].action]\" class=\"box\">\n" +
    "    {{board[28].hp}}\n" +
    "    <span ng-show=\"board[28].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[28].target, 'text-' + (board[28].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[29].type, board[29].action]\" class=\"box\">\n" +
    "    {{board[29].hp}}\n" +
    "    <span ng-show=\"board[29].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[29].target, 'text-' + (board[29].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[30].type, board[30].action]\" class=\"box\">\n" +
    "    {{board[30].hp}}\n" +
    "    <span ng-show=\"board[30].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[30].target, 'text-' + (board[30].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[31].type, board[31].action]\" class=\"box\">\n" +
    "    {{board[31].hp}}\n" +
    "    <span ng-show=\"board[31].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[31].target, 'text-' + (board[31].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[32].type, board[32].action]\" class=\"box\">\n" +
    "    {{board[32].hp}}\n" +
    "    <span ng-show=\"board[32].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[32].target, 'text-' + (board[32].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[33].type, board[33].action]\" class=\"box\">\n" +
    "    {{board[33].hp}}\n" +
    "    <span ng-show=\"board[33].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[33].target, 'text-' + (board[33].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[34].type, board[34].action]\" class=\"box\">\n" +
    "    {{board[34].hp}}\n" +
    "    <span ng-show=\"board[34].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[34].target, 'text-' + (board[34].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[35].type, board[35].action]\" class=\"box\">\n" +
    "    {{board[35].hp}}\n" +
    "    <span ng-show=\"board[35].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[35].target, 'text-' + (board[35].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[36].type, board[36].action]\" class=\"box\">\n" +
    "    {{board[36].hp}}\n" +
    "    <span ng-show=\"board[36].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[36].target, 'text-' + (board[36].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[37].type, board[37].action]\" class=\"box\">\n" +
    "    {{board[37].hp}}\n" +
    "    <span ng-show=\"board[37].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[37].target, 'text-' + (board[37].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[38].type, board[38].action]\" class=\"box\">\n" +
    "    {{board[38].hp}}\n" +
    "    <span ng-show=\"board[38].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[38].target, 'text-' + (board[38].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[39].type, board[39].action]\" class=\"box\">\n" +
    "    {{board[39].hp}}\n" +
    "    <span ng-show=\"board[39].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[39].target, 'text-' + (board[39].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[40].type, board[40].action]\" class=\"box\">\n" +
    "    {{board[40].hp}}\n" +
    "    <span ng-show=\"board[40].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[40].target, 'text-' + (board[40].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[41].type, board[41].action]\" class=\"box\">\n" +
    "    {{board[41].hp}}\n" +
    "    <span ng-show=\"board[41].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[41].target, 'text-' + (board[41].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[42].type, board[42].action]\" class=\"box\">\n" +
    "    {{board[42].hp}}\n" +
    "    <span ng-show=\"board[42].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[42].target, 'text-' + (board[42].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[43].type, board[43].action]\" class=\"box\">\n" +
    "    {{board[43].hp}}\n" +
    "    <span ng-show=\"board[43].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[43].target, 'text-' + (board[43].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[44].type, board[44].action]\" class=\"box\">\n" +
    "    {{board[44].hp}}\n" +
    "    <span ng-show=\"board[44].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[44].target, 'text-' + (board[44].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[45].type, board[45].action]\" class=\"box\">\n" +
    "    {{board[45].hp}}\n" +
    "    <span ng-show=\"board[45].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[45].target, 'text-' + (board[45].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[46].type, board[46].action]\" class=\"box\">\n" +
    "    {{board[46].hp}}\n" +
    "    <span ng-show=\"board[46].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[46].target, 'text-' + (board[46].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[47].type, board[47].action]\" class=\"box\">\n" +
    "    {{board[47].hp}}\n" +
    "    <span ng-show=\"board[47].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[47].target, 'text-' + (board[47].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[48].type, board[48].action]\" class=\"box\">\n" +
    "    {{board[48].hp}}\n" +
    "    <span ng-show=\"board[48].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[48].target, 'text-' + (board[48].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[49].type, board[49].action]\" class=\"box\">\n" +
    "    {{board[49].hp}}\n" +
    "    <span ng-show=\"board[49].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[49].target, 'text-' + (board[49].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[50].type, board[50].action]\" class=\"box\">\n" +
    "    {{board[50].hp}}\n" +
    "    <span ng-show=\"board[50].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[50].target, 'text-' + (board[50].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[51].type, board[51].action]\" class=\"box\">\n" +
    "    {{board[51].hp}}\n" +
    "    <span ng-show=\"board[51].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[51].target, 'text-' + (board[51].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[52].type, board[52].action]\" class=\"box\">\n" +
    "    {{board[52].hp}}\n" +
    "    <span ng-show=\"board[52].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[52].target, 'text-' + (board[52].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[53].type, board[53].action]\" class=\"box\">\n" +
    "    {{board[53].hp}}\n" +
    "    <span ng-show=\"board[53].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[53].target, 'text-' + (board[53].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[54].type, board[54].action]\" class=\"box\">\n" +
    "    {{board[54].hp}}\n" +
    "    <span ng-show=\"board[54].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[54].target, 'text-' + (board[54].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[55].type, board[55].action]\" class=\"box\">\n" +
    "    {{board[55].hp}}\n" +
    "    <span ng-show=\"board[55].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[55].target, 'text-' + (board[55].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[56].type, board[56].action]\" class=\"box\">\n" +
    "    {{board[56].hp}}\n" +
    "    <span ng-show=\"board[56].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[56].target, 'text-' + (board[56].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[57].type, board[57].action]\" class=\"box\">\n" +
    "    {{board[57].hp}}\n" +
    "    <span ng-show=\"board[57].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[57].target, 'text-' + (board[57].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[58].type, board[58].action]\" class=\"box\">\n" +
    "    {{board[58].hp}}\n" +
    "    <span ng-show=\"board[58].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[58].target, 'text-' + (board[58].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[59].type, board[59].action]\" class=\"box\">\n" +
    "    {{board[59].hp}}\n" +
    "    <span ng-show=\"board[59].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[59].target, 'text-' + (board[59].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[60].type, board[60].action]\" class=\"box\">\n" +
    "    {{board[60].hp}}\n" +
    "    <span ng-show=\"board[60].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[60].target, 'text-' + (board[60].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[61].type, board[61].action]\" class=\"box\">\n" +
    "    {{board[61].hp}}\n" +
    "    <span ng-show=\"board[61].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[61].target, 'text-' + (board[61].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[62].type, board[62].action]\" class=\"box\">\n" +
    "    {{board[62].hp}}\n" +
    "    <span ng-show=\"board[62].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[62].target, 'text-' + (board[62].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[63].type, board[63].action]\" class=\"box\">\n" +
    "    {{board[63].hp}}\n" +
    "    <span ng-show=\"board[63].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[63].target, 'text-' + (board[63].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[64].type, board[64].action]\" class=\"box\">\n" +
    "    {{board[64].hp}}\n" +
    "    <span ng-show=\"board[64].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[64].target, 'text-' + (board[64].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[65].type, board[65].action]\" class=\"box\">\n" +
    "    {{board[65].hp}}\n" +
    "    <span ng-show=\"board[65].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[65].target, 'text-' + (board[65].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[66].type, board[66].action]\" class=\"box\">\n" +
    "    {{board[66].hp}}\n" +
    "    <span ng-show=\"board[66].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[66].target, 'text-' + (board[66].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[67].type, board[67].action]\" class=\"box\">\n" +
    "    {{board[67].hp}}\n" +
    "    <span ng-show=\"board[67].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[67].target, 'text-' + (board[67].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[68].type, board[68].action]\" class=\"box\">\n" +
    "    {{board[68].hp}}\n" +
    "    <span ng-show=\"board[68].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[68].target, 'text-' + (board[68].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[69].type, board[69].action]\" class=\"box\">\n" +
    "    {{board[69].hp}}\n" +
    "    <span ng-show=\"board[69].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[69].target, 'text-' + (board[69].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[70].type, board[70].action]\" class=\"box\">\n" +
    "    {{board[70].hp}}\n" +
    "    <span ng-show=\"board[70].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[70].target, 'text-' + (board[70].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[71].type, board[71].action]\" class=\"box\">\n" +
    "    {{board[71].hp}}\n" +
    "    <span ng-show=\"board[71].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[71].target, 'text-' + (board[71].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[72].type, board[72].action]\" class=\"box\">\n" +
    "    {{board[72].hp}}\n" +
    "    <span ng-show=\"board[72].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[72].target, 'text-' + (board[72].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[73].type, board[73].action]\" class=\"box\">\n" +
    "    {{board[73].hp}}\n" +
    "    <span ng-show=\"board[73].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[73].target, 'text-' + (board[73].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[74].type, board[74].action]\" class=\"box\">\n" +
    "    {{board[74].hp}}\n" +
    "    <span ng-show=\"board[74].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[74].target, 'text-' + (board[74].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[75].type, board[75].action]\" class=\"box\">\n" +
    "    {{board[75].hp}}\n" +
    "    <span ng-show=\"board[75].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[75].target, 'text-' + (board[75].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[76].type, board[76].action]\" class=\"box\">\n" +
    "    {{board[76].hp}}\n" +
    "    <span ng-show=\"board[76].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[76].target, 'text-' + (board[76].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[77].type, board[77].action]\" class=\"box\">\n" +
    "    {{board[77].hp}}\n" +
    "    <span ng-show=\"board[77].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[77].target, 'text-' + (board[77].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[78].type, board[78].action]\" class=\"box\">\n" +
    "    {{board[78].hp}}\n" +
    "    <span ng-show=\"board[78].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[78].target, 'text-' + (board[78].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[79].type, board[79].action]\" class=\"box\">\n" +
    "    {{board[79].hp}}\n" +
    "    <span ng-show=\"board[79].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[79].target, 'text-' + (board[79].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[80].type, board[80].action]\" class=\"box\">\n" +
    "    {{board[80].hp}}\n" +
    "    <span ng-show=\"board[80].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[80].target, 'text-' + (board[80].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[81].type, board[81].action]\" class=\"box\">\n" +
    "    {{board[81].hp}}\n" +
    "    <span ng-show=\"board[81].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[81].target, 'text-' + (board[81].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[82].type, board[82].action]\" class=\"box\">\n" +
    "    {{board[82].hp}}\n" +
    "    <span ng-show=\"board[82].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[82].target, 'text-' + (board[82].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[83].type, board[83].action]\" class=\"box\">\n" +
    "    {{board[83].hp}}\n" +
    "    <span ng-show=\"board[83].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[83].target, 'text-' + (board[83].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[84].type, board[84].action]\" class=\"box\">\n" +
    "    {{board[84].hp}}\n" +
    "    <span ng-show=\"board[84].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[84].target, 'text-' + (board[84].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[85].type, board[85].action]\" class=\"box\">\n" +
    "    {{board[85].hp}}\n" +
    "    <span ng-show=\"board[85].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[85].target, 'text-' + (board[85].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[86].type, board[86].action]\" class=\"box\">\n" +
    "    {{board[86].hp}}\n" +
    "    <span ng-show=\"board[86].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[86].target, 'text-' + (board[86].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[87].type, board[87].action]\" class=\"box\">\n" +
    "    {{board[87].hp}}\n" +
    "    <span ng-show=\"board[87].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[87].target, 'text-' + (board[87].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[88].type, board[88].action]\" class=\"box\">\n" +
    "    {{board[88].hp}}\n" +
    "    <span ng-show=\"board[88].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[88].target, 'text-' + (board[88].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[89].type, board[89].action]\" class=\"box\">\n" +
    "    {{board[89].hp}}\n" +
    "    <span ng-show=\"board[89].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[89].target, 'text-' + (board[89].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[90].type, board[90].action]\" class=\"box\">\n" +
    "    {{board[90].hp}}\n" +
    "    <span ng-show=\"board[90].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[90].target, 'text-' + (board[90].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[91].type, board[91].action]\" class=\"box\">\n" +
    "    {{board[91].hp}}\n" +
    "    <span ng-show=\"board[91].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[91].target, 'text-' + (board[91].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[92].type, board[92].action]\" class=\"box\">\n" +
    "    {{board[92].hp}}\n" +
    "    <span ng-show=\"board[92].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[92].target, 'text-' + (board[92].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[93].type, board[93].action]\" class=\"box\">\n" +
    "    {{board[93].hp}}\n" +
    "    <span ng-show=\"board[93].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[93].target, 'text-' + (board[93].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[94].type, board[94].action]\" class=\"box\">\n" +
    "    {{board[94].hp}}\n" +
    "    <span ng-show=\"board[94].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[94].target, 'text-' + (board[94].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[95].type, board[95].action]\" class=\"box\">\n" +
    "    {{board[95].hp}}\n" +
    "    <span ng-show=\"board[95].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[95].target, 'text-' + (board[95].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[96].type, board[96].action]\" class=\"box\">\n" +
    "    {{board[96].hp}}\n" +
    "    <span ng-show=\"board[96].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[96].target, 'text-' + (board[96].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[97].type, board[97].action]\" class=\"box\">\n" +
    "    {{board[97].hp}}\n" +
    "    <span ng-show=\"board[97].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[97].target, 'text-' + (board[97].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[98].type, board[98].action]\" class=\"box\">\n" +
    "    {{board[98].hp}}\n" +
    "    <span ng-show=\"board[98].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[98].target, 'text-' + (board[98].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[99].type, board[99].action]\" class=\"box\">\n" +
    "    {{board[99].hp}}\n" +
    "    <span ng-show=\"board[99].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[99].target, 'text-' + (board[99].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[100].type, board[100].action]\" class=\"box\">\n" +
    "    {{board[100].hp}}\n" +
    "    <span ng-show=\"board[100].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[100].target, 'text-' + (board[100].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[101].type, board[101].action]\" class=\"box\">\n" +
    "    {{board[101].hp}}\n" +
    "    <span ng-show=\"board[101].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[101].target, 'text-' + (board[101].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[102].type, board[102].action]\" class=\"box\">\n" +
    "    {{board[102].hp}}\n" +
    "    <span ng-show=\"board[102].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[102].target, 'text-' + (board[102].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[103].type, board[103].action]\" class=\"box\">\n" +
    "    {{board[103].hp}}\n" +
    "    <span ng-show=\"board[103].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[103].target, 'text-' + (board[103].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[104].type, board[104].action]\" class=\"box\">\n" +
    "    {{board[104].hp}}\n" +
    "    <span ng-show=\"board[104].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[104].target, 'text-' + (board[104].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[105].type, board[105].action]\" class=\"box\">\n" +
    "    {{board[105].hp}}\n" +
    "    <span ng-show=\"board[105].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[105].target, 'text-' + (board[105].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[106].type, board[106].action]\" class=\"box\">\n" +
    "    {{board[106].hp}}\n" +
    "    <span ng-show=\"board[106].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[106].target, 'text-' + (board[106].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[107].type, board[107].action]\" class=\"box\">\n" +
    "    {{board[107].hp}}\n" +
    "    <span ng-show=\"board[107].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[107].target, 'text-' + (board[107].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[108].type, board[108].action]\" class=\"box\">\n" +
    "    {{board[108].hp}}\n" +
    "    <span ng-show=\"board[108].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[108].target, 'text-' + (board[108].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[109].type, board[109].action]\" class=\"box\">\n" +
    "    {{board[109].hp}}\n" +
    "    <span ng-show=\"board[109].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[109].target, 'text-' + (board[109].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[110].type, board[110].action]\" class=\"box\">\n" +
    "    {{board[110].hp}}\n" +
    "    <span ng-show=\"board[110].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[110].target, 'text-' + (board[110].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[111].type, board[111].action]\" class=\"box\">\n" +
    "    {{board[111].hp}}\n" +
    "    <span ng-show=\"board[111].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[111].target, 'text-' + (board[111].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[112].type, board[112].action]\" class=\"box\">\n" +
    "    {{board[112].hp}}\n" +
    "    <span ng-show=\"board[112].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[112].target, 'text-' + (board[112].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[113].type, board[113].action]\" class=\"box\">\n" +
    "    {{board[113].hp}}\n" +
    "    <span ng-show=\"board[113].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[113].target, 'text-' + (board[113].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[114].type, board[114].action]\" class=\"box\">\n" +
    "    {{board[114].hp}}\n" +
    "    <span ng-show=\"board[114].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[114].target, 'text-' + (board[114].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[115].type, board[115].action]\" class=\"box\">\n" +
    "    {{board[115].hp}}\n" +
    "    <span ng-show=\"board[115].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[115].target, 'text-' + (board[115].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[116].type, board[116].action]\" class=\"box\">\n" +
    "    {{board[116].hp}}\n" +
    "    <span ng-show=\"board[116].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[116].target, 'text-' + (board[116].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[117].type, board[117].action]\" class=\"box\">\n" +
    "    {{board[117].hp}}\n" +
    "    <span ng-show=\"board[117].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[117].target, 'text-' + (board[117].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[118].type, board[118].action]\" class=\"box\">\n" +
    "    {{board[118].hp}}\n" +
    "    <span ng-show=\"board[118].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[118].target, 'text-' + (board[118].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[119].type, board[119].action]\" class=\"box\">\n" +
    "    {{board[119].hp}}\n" +
    "    <span ng-show=\"board[119].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[119].target, 'text-' + (board[119].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[120].type, board[120].action]\" class=\"box\">\n" +
    "    {{board[120].hp}}\n" +
    "    <span ng-show=\"board[120].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[120].target, 'text-' + (board[120].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[121].type, board[121].action]\" class=\"box\">\n" +
    "    {{board[121].hp}}\n" +
    "    <span ng-show=\"board[121].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[121].target, 'text-' + (board[121].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[122].type, board[122].action]\" class=\"box\">\n" +
    "    {{board[122].hp}}\n" +
    "    <span ng-show=\"board[122].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[122].target, 'text-' + (board[122].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[123].type, board[123].action]\" class=\"box\">\n" +
    "    {{board[123].hp}}\n" +
    "    <span ng-show=\"board[123].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[123].target, 'text-' + (board[123].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[124].type, board[124].action]\" class=\"box\">\n" +
    "    {{board[124].hp}}\n" +
    "    <span ng-show=\"board[124].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[124].target, 'text-' + (board[124].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[125].type, board[125].action]\" class=\"box\">\n" +
    "    {{board[125].hp}}\n" +
    "    <span ng-show=\"board[125].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[125].target, 'text-' + (board[125].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[126].type, board[126].action]\" class=\"box\">\n" +
    "    {{board[126].hp}}\n" +
    "    <span ng-show=\"board[126].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[126].target, 'text-' + (board[126].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[127].type, board[127].action]\" class=\"box\">\n" +
    "    {{board[127].hp}}\n" +
    "    <span ng-show=\"board[127].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[127].target, 'text-' + (board[127].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[128].type, board[128].action]\" class=\"box\">\n" +
    "    {{board[128].hp}}\n" +
    "    <span ng-show=\"board[128].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[128].target, 'text-' + (board[128].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[129].type, board[129].action]\" class=\"box\">\n" +
    "    {{board[129].hp}}\n" +
    "    <span ng-show=\"board[129].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[129].target, 'text-' + (board[129].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[130].type, board[130].action]\" class=\"box\">\n" +
    "    {{board[130].hp}}\n" +
    "    <span ng-show=\"board[130].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[130].target, 'text-' + (board[130].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[131].type, board[131].action]\" class=\"box\">\n" +
    "    {{board[131].hp}}\n" +
    "    <span ng-show=\"board[131].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[131].target, 'text-' + (board[131].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[132].type, board[132].action]\" class=\"box\">\n" +
    "    {{board[132].hp}}\n" +
    "    <span ng-show=\"board[132].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[132].target, 'text-' + (board[132].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[133].type, board[133].action]\" class=\"box\">\n" +
    "    {{board[133].hp}}\n" +
    "    <span ng-show=\"board[133].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[133].target, 'text-' + (board[133].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[134].type, board[134].action]\" class=\"box\">\n" +
    "    {{board[134].hp}}\n" +
    "    <span ng-show=\"board[134].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[134].target, 'text-' + (board[134].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[135].type, board[135].action]\" class=\"box\">\n" +
    "    {{board[135].hp}}\n" +
    "    <span ng-show=\"board[135].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[135].target, 'text-' + (board[135].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[136].type, board[136].action]\" class=\"box\">\n" +
    "    {{board[136].hp}}\n" +
    "    <span ng-show=\"board[136].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[136].target, 'text-' + (board[136].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[137].type, board[137].action]\" class=\"box\">\n" +
    "    {{board[137].hp}}\n" +
    "    <span ng-show=\"board[137].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[137].target, 'text-' + (board[137].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[138].type, board[138].action]\" class=\"box\">\n" +
    "    {{board[138].hp}}\n" +
    "    <span ng-show=\"board[138].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[138].target, 'text-' + (board[138].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[139].type, board[139].action]\" class=\"box\">\n" +
    "    {{board[139].hp}}\n" +
    "    <span ng-show=\"board[139].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[139].target, 'text-' + (board[139].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[140].type, board[140].action]\" class=\"box\">\n" +
    "    {{board[140].hp}}\n" +
    "    <span ng-show=\"board[140].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[140].target, 'text-' + (board[140].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[141].type, board[141].action]\" class=\"box\">\n" +
    "    {{board[141].hp}}\n" +
    "    <span ng-show=\"board[141].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[141].target, 'text-' + (board[141].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[142].type, board[142].action]\" class=\"box\">\n" +
    "    {{board[142].hp}}\n" +
    "    <span ng-show=\"board[142].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[142].target, 'text-' + (board[142].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[143].type, board[143].action]\" class=\"box\">\n" +
    "    {{board[143].hp}}\n" +
    "    <span ng-show=\"board[143].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[143].target, 'text-' + (board[143].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[144].type, board[144].action]\" class=\"box\">\n" +
    "    {{board[144].hp}}\n" +
    "    <span ng-show=\"board[144].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[144].target, 'text-' + (board[144].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[145].type, board[145].action]\" class=\"box\">\n" +
    "    {{board[145].hp}}\n" +
    "    <span ng-show=\"board[145].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[145].target, 'text-' + (board[145].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[146].type, board[146].action]\" class=\"box\">\n" +
    "    {{board[146].hp}}\n" +
    "    <span ng-show=\"board[146].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[146].target, 'text-' + (board[146].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[147].type, board[147].action]\" class=\"box\">\n" +
    "    {{board[147].hp}}\n" +
    "    <span ng-show=\"board[147].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[147].target, 'text-' + (board[147].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[148].type, board[148].action]\" class=\"box\">\n" +
    "    {{board[148].hp}}\n" +
    "    <span ng-show=\"board[148].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[148].target, 'text-' + (board[148].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[149].type, board[149].action]\" class=\"box\">\n" +
    "    {{board[149].hp}}\n" +
    "    <span ng-show=\"board[149].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[149].target, 'text-' + (board[149].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[150].type, board[150].action]\" class=\"box\">\n" +
    "    {{board[150].hp}}\n" +
    "    <span ng-show=\"board[150].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[150].target, 'text-' + (board[150].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[151].type, board[151].action]\" class=\"box\">\n" +
    "    {{board[151].hp}}\n" +
    "    <span ng-show=\"board[151].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[151].target, 'text-' + (board[151].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[152].type, board[152].action]\" class=\"box\">\n" +
    "    {{board[152].hp}}\n" +
    "    <span ng-show=\"board[152].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[152].target, 'text-' + (board[152].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[153].type, board[153].action]\" class=\"box\">\n" +
    "    {{board[153].hp}}\n" +
    "    <span ng-show=\"board[153].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[153].target, 'text-' + (board[153].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[154].type, board[154].action]\" class=\"box\">\n" +
    "    {{board[154].hp}}\n" +
    "    <span ng-show=\"board[154].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[154].target, 'text-' + (board[154].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[155].type, board[155].action]\" class=\"box\">\n" +
    "    {{board[155].hp}}\n" +
    "    <span ng-show=\"board[155].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[155].target, 'text-' + (board[155].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[156].type, board[156].action]\" class=\"box\">\n" +
    "    {{board[156].hp}}\n" +
    "    <span ng-show=\"board[156].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[156].target, 'text-' + (board[156].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[157].type, board[157].action]\" class=\"box\">\n" +
    "    {{board[157].hp}}\n" +
    "    <span ng-show=\"board[157].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[157].target, 'text-' + (board[157].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[158].type, board[158].action]\" class=\"box\">\n" +
    "    {{board[158].hp}}\n" +
    "    <span ng-show=\"board[158].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[158].target, 'text-' + (board[158].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[159].type, board[159].action]\" class=\"box\">\n" +
    "    {{board[159].hp}}\n" +
    "    <span ng-show=\"board[159].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[159].target, 'text-' + (board[159].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[160].type, board[160].action]\" class=\"box\">\n" +
    "    {{board[160].hp}}\n" +
    "    <span ng-show=\"board[160].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[160].target, 'text-' + (board[160].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[161].type, board[161].action]\" class=\"box\">\n" +
    "    {{board[161].hp}}\n" +
    "    <span ng-show=\"board[161].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[161].target, 'text-' + (board[161].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[162].type, board[162].action]\" class=\"box\">\n" +
    "    {{board[162].hp}}\n" +
    "    <span ng-show=\"board[162].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[162].target, 'text-' + (board[162].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[163].type, board[163].action]\" class=\"box\">\n" +
    "    {{board[163].hp}}\n" +
    "    <span ng-show=\"board[163].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[163].target, 'text-' + (board[163].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[164].type, board[164].action]\" class=\"box\">\n" +
    "    {{board[164].hp}}\n" +
    "    <span ng-show=\"board[164].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[164].target, 'text-' + (board[164].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[165].type, board[165].action]\" class=\"box\">\n" +
    "    {{board[165].hp}}\n" +
    "    <span ng-show=\"board[165].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[165].target, 'text-' + (board[165].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[166].type, board[166].action]\" class=\"box\">\n" +
    "    {{board[166].hp}}\n" +
    "    <span ng-show=\"board[166].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[166].target, 'text-' + (board[166].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[167].type, board[167].action]\" class=\"box\">\n" +
    "    {{board[167].hp}}\n" +
    "    <span ng-show=\"board[167].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[167].target, 'text-' + (board[167].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[168].type, board[168].action]\" class=\"box\">\n" +
    "    {{board[168].hp}}\n" +
    "    <span ng-show=\"board[168].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[168].target, 'text-' + (board[168].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[169].type, board[169].action]\" class=\"box\">\n" +
    "    {{board[169].hp}}\n" +
    "    <span ng-show=\"board[169].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[169].target, 'text-' + (board[169].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[170].type, board[170].action]\" class=\"box\">\n" +
    "    {{board[170].hp}}\n" +
    "    <span ng-show=\"board[170].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[170].target, 'text-' + (board[170].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[171].type, board[171].action]\" class=\"box\">\n" +
    "    {{board[171].hp}}\n" +
    "    <span ng-show=\"board[171].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[171].target, 'text-' + (board[171].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[172].type, board[172].action]\" class=\"box\">\n" +
    "    {{board[172].hp}}\n" +
    "    <span ng-show=\"board[172].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[172].target, 'text-' + (board[172].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[173].type, board[173].action]\" class=\"box\">\n" +
    "    {{board[173].hp}}\n" +
    "    <span ng-show=\"board[173].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[173].target, 'text-' + (board[173].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[174].type, board[174].action]\" class=\"box\">\n" +
    "    {{board[174].hp}}\n" +
    "    <span ng-show=\"board[174].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[174].target, 'text-' + (board[174].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[175].type, board[175].action]\" class=\"box\">\n" +
    "    {{board[175].hp}}\n" +
    "    <span ng-show=\"board[175].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[175].target, 'text-' + (board[175].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[176].type, board[176].action]\" class=\"box\">\n" +
    "    {{board[176].hp}}\n" +
    "    <span ng-show=\"board[176].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[176].target, 'text-' + (board[176].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[177].type, board[177].action]\" class=\"box\">\n" +
    "    {{board[177].hp}}\n" +
    "    <span ng-show=\"board[177].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[177].target, 'text-' + (board[177].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[178].type, board[178].action]\" class=\"box\">\n" +
    "    {{board[178].hp}}\n" +
    "    <span ng-show=\"board[178].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[178].target, 'text-' + (board[178].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[179].type, board[179].action]\" class=\"box\">\n" +
    "    {{board[179].hp}}\n" +
    "    <span ng-show=\"board[179].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[179].target, 'text-' + (board[179].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[180].type, board[180].action]\" class=\"box\">\n" +
    "    {{board[180].hp}}\n" +
    "    <span ng-show=\"board[180].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[180].target, 'text-' + (board[180].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[181].type, board[181].action]\" class=\"box\">\n" +
    "    {{board[181].hp}}\n" +
    "    <span ng-show=\"board[181].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[181].target, 'text-' + (board[181].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[182].type, board[182].action]\" class=\"box\">\n" +
    "    {{board[182].hp}}\n" +
    "    <span ng-show=\"board[182].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[182].target, 'text-' + (board[182].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[183].type, board[183].action]\" class=\"box\">\n" +
    "    {{board[183].hp}}\n" +
    "    <span ng-show=\"board[183].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[183].target, 'text-' + (board[183].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[184].type, board[184].action]\" class=\"box\">\n" +
    "    {{board[184].hp}}\n" +
    "    <span ng-show=\"board[184].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[184].target, 'text-' + (board[184].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[185].type, board[185].action]\" class=\"box\">\n" +
    "    {{board[185].hp}}\n" +
    "    <span ng-show=\"board[185].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[185].target, 'text-' + (board[185].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[186].type, board[186].action]\" class=\"box\">\n" +
    "    {{board[186].hp}}\n" +
    "    <span ng-show=\"board[186].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[186].target, 'text-' + (board[186].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[187].type, board[187].action]\" class=\"box\">\n" +
    "    {{board[187].hp}}\n" +
    "    <span ng-show=\"board[187].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[187].target, 'text-' + (board[187].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[188].type, board[188].action]\" class=\"box\">\n" +
    "    {{board[188].hp}}\n" +
    "    <span ng-show=\"board[188].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[188].target, 'text-' + (board[188].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[189].type, board[189].action]\" class=\"box\">\n" +
    "    {{board[189].hp}}\n" +
    "    <span ng-show=\"board[189].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[189].target, 'text-' + (board[189].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[190].type, board[190].action]\" class=\"box\">\n" +
    "    {{board[190].hp}}\n" +
    "    <span ng-show=\"board[190].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[190].target, 'text-' + (board[190].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[191].type, board[191].action]\" class=\"box\">\n" +
    "    {{board[191].hp}}\n" +
    "    <span ng-show=\"board[191].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[191].target, 'text-' + (board[191].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[192].type, board[192].action]\" class=\"box\">\n" +
    "    {{board[192].hp}}\n" +
    "    <span ng-show=\"board[192].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[192].target, 'text-' + (board[192].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[193].type, board[193].action]\" class=\"box\">\n" +
    "    {{board[193].hp}}\n" +
    "    <span ng-show=\"board[193].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[193].target, 'text-' + (board[193].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[194].type, board[194].action]\" class=\"box\">\n" +
    "    {{board[194].hp}}\n" +
    "    <span ng-show=\"board[194].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[194].target, 'text-' + (board[194].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[195].type, board[195].action]\" class=\"box\">\n" +
    "    {{board[195].hp}}\n" +
    "    <span ng-show=\"board[195].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[195].target, 'text-' + (board[195].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[196].type, board[196].action]\" class=\"box\">\n" +
    "    {{board[196].hp}}\n" +
    "    <span ng-show=\"board[196].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[196].target, 'text-' + (board[196].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[197].type, board[197].action]\" class=\"box\">\n" +
    "    {{board[197].hp}}\n" +
    "    <span ng-show=\"board[197].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[197].target, 'text-' + (board[197].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[198].type, board[198].action]\" class=\"box\">\n" +
    "    {{board[198].hp}}\n" +
    "    <span ng-show=\"board[198].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[198].target, 'text-' + (board[198].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[199].type, board[199].action]\" class=\"box\">\n" +
    "    {{board[199].hp}}\n" +
    "    <span ng-show=\"board[199].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[199].target, 'text-' + (board[199].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[200].type, board[200].action]\" class=\"box\">\n" +
    "    {{board[200].hp}}\n" +
    "    <span ng-show=\"board[200].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[200].target, 'text-' + (board[200].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[201].type, board[201].action]\" class=\"box\">\n" +
    "    {{board[201].hp}}\n" +
    "    <span ng-show=\"board[201].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[201].target, 'text-' + (board[201].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[202].type, board[202].action]\" class=\"box\">\n" +
    "    {{board[202].hp}}\n" +
    "    <span ng-show=\"board[202].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[202].target, 'text-' + (board[202].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[203].type, board[203].action]\" class=\"box\">\n" +
    "    {{board[203].hp}}\n" +
    "    <span ng-show=\"board[203].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[203].target, 'text-' + (board[203].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[204].type, board[204].action]\" class=\"box\">\n" +
    "    {{board[204].hp}}\n" +
    "    <span ng-show=\"board[204].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[204].target, 'text-' + (board[204].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[205].type, board[205].action]\" class=\"box\">\n" +
    "    {{board[205].hp}}\n" +
    "    <span ng-show=\"board[205].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[205].target, 'text-' + (board[205].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[206].type, board[206].action]\" class=\"box\">\n" +
    "    {{board[206].hp}}\n" +
    "    <span ng-show=\"board[206].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[206].target, 'text-' + (board[206].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[207].type, board[207].action]\" class=\"box\">\n" +
    "    {{board[207].hp}}\n" +
    "    <span ng-show=\"board[207].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[207].target, 'text-' + (board[207].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[208].type, board[208].action]\" class=\"box\">\n" +
    "    {{board[208].hp}}\n" +
    "    <span ng-show=\"board[208].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[208].target, 'text-' + (board[208].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[209].type, board[209].action]\" class=\"box\">\n" +
    "    {{board[209].hp}}\n" +
    "    <span ng-show=\"board[209].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[209].target, 'text-' + (board[209].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[210].type, board[210].action]\" class=\"box\">\n" +
    "    {{board[210].hp}}\n" +
    "    <span ng-show=\"board[210].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[210].target, 'text-' + (board[210].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[211].type, board[211].action]\" class=\"box\">\n" +
    "    {{board[211].hp}}\n" +
    "    <span ng-show=\"board[211].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[211].target, 'text-' + (board[211].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[212].type, board[212].action]\" class=\"box\">\n" +
    "    {{board[212].hp}}\n" +
    "    <span ng-show=\"board[212].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[212].target, 'text-' + (board[212].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[213].type, board[213].action]\" class=\"box\">\n" +
    "    {{board[213].hp}}\n" +
    "    <span ng-show=\"board[213].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[213].target, 'text-' + (board[213].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[214].type, board[214].action]\" class=\"box\">\n" +
    "    {{board[214].hp}}\n" +
    "    <span ng-show=\"board[214].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[214].target, 'text-' + (board[214].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[215].type, board[215].action]\" class=\"box\">\n" +
    "    {{board[215].hp}}\n" +
    "    <span ng-show=\"board[215].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[215].target, 'text-' + (board[215].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[216].type, board[216].action]\" class=\"box\">\n" +
    "    {{board[216].hp}}\n" +
    "    <span ng-show=\"board[216].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[216].target, 'text-' + (board[216].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[217].type, board[217].action]\" class=\"box\">\n" +
    "    {{board[217].hp}}\n" +
    "    <span ng-show=\"board[217].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[217].target, 'text-' + (board[217].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[218].type, board[218].action]\" class=\"box\">\n" +
    "    {{board[218].hp}}\n" +
    "    <span ng-show=\"board[218].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[218].target, 'text-' + (board[218].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[219].type, board[219].action]\" class=\"box\">\n" +
    "    {{board[219].hp}}\n" +
    "    <span ng-show=\"board[219].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[219].target, 'text-' + (board[219].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[220].type, board[220].action]\" class=\"box\">\n" +
    "    {{board[220].hp}}\n" +
    "    <span ng-show=\"board[220].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[220].target, 'text-' + (board[220].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[221].type, board[221].action]\" class=\"box\">\n" +
    "    {{board[221].hp}}\n" +
    "    <span ng-show=\"board[221].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[221].target, 'text-' + (board[221].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[222].type, board[222].action]\" class=\"box\">\n" +
    "    {{board[222].hp}}\n" +
    "    <span ng-show=\"board[222].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[222].target, 'text-' + (board[222].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[223].type, board[223].action]\" class=\"box\">\n" +
    "    {{board[223].hp}}\n" +
    "    <span ng-show=\"board[223].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[223].target, 'text-' + (board[223].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[224].type, board[224].action]\" class=\"box\">\n" +
    "    {{board[224].hp}}\n" +
    "    <span ng-show=\"board[224].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[224].target, 'text-' + (board[224].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[225].type, board[225].action]\" class=\"box\">\n" +
    "    {{board[225].hp}}\n" +
    "    <span ng-show=\"board[225].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[225].target, 'text-' + (board[225].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[226].type, board[226].action]\" class=\"box\">\n" +
    "    {{board[226].hp}}\n" +
    "    <span ng-show=\"board[226].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[226].target, 'text-' + (board[226].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[227].type, board[227].action]\" class=\"box\">\n" +
    "    {{board[227].hp}}\n" +
    "    <span ng-show=\"board[227].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[227].target, 'text-' + (board[227].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[228].type, board[228].action]\" class=\"box\">\n" +
    "    {{board[228].hp}}\n" +
    "    <span ng-show=\"board[228].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[228].target, 'text-' + (board[228].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[229].type, board[229].action]\" class=\"box\">\n" +
    "    {{board[229].hp}}\n" +
    "    <span ng-show=\"board[229].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[229].target, 'text-' + (board[229].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[230].type, board[230].action]\" class=\"box\">\n" +
    "    {{board[230].hp}}\n" +
    "    <span ng-show=\"board[230].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[230].target, 'text-' + (board[230].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[231].type, board[231].action]\" class=\"box\">\n" +
    "    {{board[231].hp}}\n" +
    "    <span ng-show=\"board[231].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[231].target, 'text-' + (board[231].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[232].type, board[232].action]\" class=\"box\">\n" +
    "    {{board[232].hp}}\n" +
    "    <span ng-show=\"board[232].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[232].target, 'text-' + (board[232].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[233].type, board[233].action]\" class=\"box\">\n" +
    "    {{board[233].hp}}\n" +
    "    <span ng-show=\"board[233].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[233].target, 'text-' + (board[233].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[234].type, board[234].action]\" class=\"box\">\n" +
    "    {{board[234].hp}}\n" +
    "    <span ng-show=\"board[234].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[234].target, 'text-' + (board[234].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[235].type, board[235].action]\" class=\"box\">\n" +
    "    {{board[235].hp}}\n" +
    "    <span ng-show=\"board[235].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[235].target, 'text-' + (board[235].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[236].type, board[236].action]\" class=\"box\">\n" +
    "    {{board[236].hp}}\n" +
    "    <span ng-show=\"board[236].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[236].target, 'text-' + (board[236].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[237].type, board[237].action]\" class=\"box\">\n" +
    "    {{board[237].hp}}\n" +
    "    <span ng-show=\"board[237].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[237].target, 'text-' + (board[237].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[238].type, board[238].action]\" class=\"box\">\n" +
    "    {{board[238].hp}}\n" +
    "    <span ng-show=\"board[238].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[238].target, 'text-' + (board[238].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[239].type, board[239].action]\" class=\"box\">\n" +
    "    {{board[239].hp}}\n" +
    "    <span ng-show=\"board[239].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[239].target, 'text-' + (board[239].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[240].type, board[240].action]\" class=\"box\">\n" +
    "    {{board[240].hp}}\n" +
    "    <span ng-show=\"board[240].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[240].target, 'text-' + (board[240].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[241].type, board[241].action]\" class=\"box\">\n" +
    "    {{board[241].hp}}\n" +
    "    <span ng-show=\"board[241].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[241].target, 'text-' + (board[241].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[242].type, board[242].action]\" class=\"box\">\n" +
    "    {{board[242].hp}}\n" +
    "    <span ng-show=\"board[242].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[242].target, 'text-' + (board[242].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[243].type, board[243].action]\" class=\"box\">\n" +
    "    {{board[243].hp}}\n" +
    "    <span ng-show=\"board[243].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[243].target, 'text-' + (board[243].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[244].type, board[244].action]\" class=\"box\">\n" +
    "    {{board[244].hp}}\n" +
    "    <span ng-show=\"board[244].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[244].target, 'text-' + (board[244].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[245].type, board[245].action]\" class=\"box\">\n" +
    "    {{board[245].hp}}\n" +
    "    <span ng-show=\"board[245].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[245].target, 'text-' + (board[245].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[246].type, board[246].action]\" class=\"box\">\n" +
    "    {{board[246].hp}}\n" +
    "    <span ng-show=\"board[246].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[246].target, 'text-' + (board[246].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[247].type, board[247].action]\" class=\"box\">\n" +
    "    {{board[247].hp}}\n" +
    "    <span ng-show=\"board[247].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[247].target, 'text-' + (board[247].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[248].type, board[248].action]\" class=\"box\">\n" +
    "    {{board[248].hp}}\n" +
    "    <span ng-show=\"board[248].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[248].target, 'text-' + (board[248].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[249].type, board[249].action]\" class=\"box\">\n" +
    "    {{board[249].hp}}\n" +
    "    <span ng-show=\"board[249].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[249].target, 'text-' + (board[249].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[250].type, board[250].action]\" class=\"box\">\n" +
    "    {{board[250].hp}}\n" +
    "    <span ng-show=\"board[250].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[250].target, 'text-' + (board[250].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[251].type, board[251].action]\" class=\"box\">\n" +
    "    {{board[251].hp}}\n" +
    "    <span ng-show=\"board[251].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[251].target, 'text-' + (board[251].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[252].type, board[252].action]\" class=\"box\">\n" +
    "    {{board[252].hp}}\n" +
    "    <span ng-show=\"board[252].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[252].target, 'text-' + (board[252].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[253].type, board[253].action]\" class=\"box\">\n" +
    "    {{board[253].hp}}\n" +
    "    <span ng-show=\"board[253].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[253].target, 'text-' + (board[253].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[254].type, board[254].action]\" class=\"box\">\n" +
    "    {{board[254].hp}}\n" +
    "    <span ng-show=\"board[254].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[254].target, 'text-' + (board[254].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[255].type, board[255].action]\" class=\"box\">\n" +
    "    {{board[255].hp}}\n" +
    "    <span ng-show=\"board[255].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[255].target, 'text-' + (board[255].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[256].type, board[256].action]\" class=\"box\">\n" +
    "    {{board[256].hp}}\n" +
    "    <span ng-show=\"board[256].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[256].target, 'text-' + (board[256].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[257].type, board[257].action]\" class=\"box\">\n" +
    "    {{board[257].hp}}\n" +
    "    <span ng-show=\"board[257].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[257].target, 'text-' + (board[257].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[258].type, board[258].action]\" class=\"box\">\n" +
    "    {{board[258].hp}}\n" +
    "    <span ng-show=\"board[258].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[258].target, 'text-' + (board[258].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[259].type, board[259].action]\" class=\"box\">\n" +
    "    {{board[259].hp}}\n" +
    "    <span ng-show=\"board[259].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[259].target, 'text-' + (board[259].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[260].type, board[260].action]\" class=\"box\">\n" +
    "    {{board[260].hp}}\n" +
    "    <span ng-show=\"board[260].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[260].target, 'text-' + (board[260].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[261].type, board[261].action]\" class=\"box\">\n" +
    "    {{board[261].hp}}\n" +
    "    <span ng-show=\"board[261].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[261].target, 'text-' + (board[261].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[262].type, board[262].action]\" class=\"box\">\n" +
    "    {{board[262].hp}}\n" +
    "    <span ng-show=\"board[262].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[262].target, 'text-' + (board[262].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[263].type, board[263].action]\" class=\"box\">\n" +
    "    {{board[263].hp}}\n" +
    "    <span ng-show=\"board[263].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[263].target, 'text-' + (board[263].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[264].type, board[264].action]\" class=\"box\">\n" +
    "    {{board[264].hp}}\n" +
    "    <span ng-show=\"board[264].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[264].target, 'text-' + (board[264].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[265].type, board[265].action]\" class=\"box\">\n" +
    "    {{board[265].hp}}\n" +
    "    <span ng-show=\"board[265].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[265].target, 'text-' + (board[265].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[266].type, board[266].action]\" class=\"box\">\n" +
    "    {{board[266].hp}}\n" +
    "    <span ng-show=\"board[266].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[266].target, 'text-' + (board[266].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[267].type, board[267].action]\" class=\"box\">\n" +
    "    {{board[267].hp}}\n" +
    "    <span ng-show=\"board[267].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[267].target, 'text-' + (board[267].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[268].type, board[268].action]\" class=\"box\">\n" +
    "    {{board[268].hp}}\n" +
    "    <span ng-show=\"board[268].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[268].target, 'text-' + (board[268].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[269].type, board[269].action]\" class=\"box\">\n" +
    "    {{board[269].hp}}\n" +
    "    <span ng-show=\"board[269].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[269].target, 'text-' + (board[269].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[270].type, board[270].action]\" class=\"box\">\n" +
    "    {{board[270].hp}}\n" +
    "    <span ng-show=\"board[270].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[270].target, 'text-' + (board[270].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[271].type, board[271].action]\" class=\"box\">\n" +
    "    {{board[271].hp}}\n" +
    "    <span ng-show=\"board[271].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[271].target, 'text-' + (board[271].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[272].type, board[272].action]\" class=\"box\">\n" +
    "    {{board[272].hp}}\n" +
    "    <span ng-show=\"board[272].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[272].target, 'text-' + (board[272].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[273].type, board[273].action]\" class=\"box\">\n" +
    "    {{board[273].hp}}\n" +
    "    <span ng-show=\"board[273].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[273].target, 'text-' + (board[273].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[274].type, board[274].action]\" class=\"box\">\n" +
    "    {{board[274].hp}}\n" +
    "    <span ng-show=\"board[274].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[274].target, 'text-' + (board[274].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[275].type, board[275].action]\" class=\"box\">\n" +
    "    {{board[275].hp}}\n" +
    "    <span ng-show=\"board[275].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[275].target, 'text-' + (board[275].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[276].type, board[276].action]\" class=\"box\">\n" +
    "    {{board[276].hp}}\n" +
    "    <span ng-show=\"board[276].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[276].target, 'text-' + (board[276].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[277].type, board[277].action]\" class=\"box\">\n" +
    "    {{board[277].hp}}\n" +
    "    <span ng-show=\"board[277].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[277].target, 'text-' + (board[277].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[278].type, board[278].action]\" class=\"box\">\n" +
    "    {{board[278].hp}}\n" +
    "    <span ng-show=\"board[278].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[278].target, 'text-' + (board[278].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[279].type, board[279].action]\" class=\"box\">\n" +
    "    {{board[279].hp}}\n" +
    "    <span ng-show=\"board[279].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[279].target, 'text-' + (board[279].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[280].type, board[280].action]\" class=\"box\">\n" +
    "    {{board[280].hp}}\n" +
    "    <span ng-show=\"board[280].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[280].target, 'text-' + (board[280].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[281].type, board[281].action]\" class=\"box\">\n" +
    "    {{board[281].hp}}\n" +
    "    <span ng-show=\"board[281].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[281].target, 'text-' + (board[281].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[282].type, board[282].action]\" class=\"box\">\n" +
    "    {{board[282].hp}}\n" +
    "    <span ng-show=\"board[282].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[282].target, 'text-' + (board[282].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[283].type, board[283].action]\" class=\"box\">\n" +
    "    {{board[283].hp}}\n" +
    "    <span ng-show=\"board[283].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[283].target, 'text-' + (board[283].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[284].type, board[284].action]\" class=\"box\">\n" +
    "    {{board[284].hp}}\n" +
    "    <span ng-show=\"board[284].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[284].target, 'text-' + (board[284].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[285].type, board[285].action]\" class=\"box\">\n" +
    "    {{board[285].hp}}\n" +
    "    <span ng-show=\"board[285].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[285].target, 'text-' + (board[285].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[286].type, board[286].action]\" class=\"box\">\n" +
    "    {{board[286].hp}}\n" +
    "    <span ng-show=\"board[286].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[286].target, 'text-' + (board[286].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[287].type, board[287].action]\" class=\"box\">\n" +
    "    {{board[287].hp}}\n" +
    "    <span ng-show=\"board[287].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[287].target, 'text-' + (board[287].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[288].type, board[288].action]\" class=\"box\">\n" +
    "    {{board[288].hp}}\n" +
    "    <span ng-show=\"board[288].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[288].target, 'text-' + (board[288].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[289].type, board[289].action]\" class=\"box\">\n" +
    "    {{board[289].hp}}\n" +
    "    <span ng-show=\"board[289].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[289].target, 'text-' + (board[289].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[290].type, board[290].action]\" class=\"box\">\n" +
    "    {{board[290].hp}}\n" +
    "    <span ng-show=\"board[290].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[290].target, 'text-' + (board[290].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[291].type, board[291].action]\" class=\"box\">\n" +
    "    {{board[291].hp}}\n" +
    "    <span ng-show=\"board[291].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[291].target, 'text-' + (board[291].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[292].type, board[292].action]\" class=\"box\">\n" +
    "    {{board[292].hp}}\n" +
    "    <span ng-show=\"board[292].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[292].target, 'text-' + (board[292].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[293].type, board[293].action]\" class=\"box\">\n" +
    "    {{board[293].hp}}\n" +
    "    <span ng-show=\"board[293].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[293].target, 'text-' + (board[293].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[294].type, board[294].action]\" class=\"box\">\n" +
    "    {{board[294].hp}}\n" +
    "    <span ng-show=\"board[294].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[294].target, 'text-' + (board[294].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[295].type, board[295].action]\" class=\"box\">\n" +
    "    {{board[295].hp}}\n" +
    "    <span ng-show=\"board[295].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[295].target, 'text-' + (board[295].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[296].type, board[296].action]\" class=\"box\">\n" +
    "    {{board[296].hp}}\n" +
    "    <span ng-show=\"board[296].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[296].target, 'text-' + (board[296].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[297].type, board[297].action]\" class=\"box\">\n" +
    "    {{board[297].hp}}\n" +
    "    <span ng-show=\"board[297].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[297].target, 'text-' + (board[297].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[298].type, board[298].action]\" class=\"box\">\n" +
    "    {{board[298].hp}}\n" +
    "    <span ng-show=\"board[298].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[298].target, 'text-' + (board[298].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[299].type, board[299].action]\" class=\"box\">\n" +
    "    {{board[299].hp}}\n" +
    "    <span ng-show=\"board[299].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[299].target, 'text-' + (board[299].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[300].type, board[300].action]\" class=\"box\">\n" +
    "    {{board[300].hp}}\n" +
    "    <span ng-show=\"board[300].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[300].target, 'text-' + (board[300].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[301].type, board[301].action]\" class=\"box\">\n" +
    "    {{board[301].hp}}\n" +
    "    <span ng-show=\"board[301].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[301].target, 'text-' + (board[301].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[302].type, board[302].action]\" class=\"box\">\n" +
    "    {{board[302].hp}}\n" +
    "    <span ng-show=\"board[302].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[302].target, 'text-' + (board[302].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[303].type, board[303].action]\" class=\"box\">\n" +
    "    {{board[303].hp}}\n" +
    "    <span ng-show=\"board[303].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[303].target, 'text-' + (board[303].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[304].type, board[304].action]\" class=\"box\">\n" +
    "    {{board[304].hp}}\n" +
    "    <span ng-show=\"board[304].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[304].target, 'text-' + (board[304].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[305].type, board[305].action]\" class=\"box\">\n" +
    "    {{board[305].hp}}\n" +
    "    <span ng-show=\"board[305].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[305].target, 'text-' + (board[305].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[306].type, board[306].action]\" class=\"box\">\n" +
    "    {{board[306].hp}}\n" +
    "    <span ng-show=\"board[306].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[306].target, 'text-' + (board[306].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[307].type, board[307].action]\" class=\"box\">\n" +
    "    {{board[307].hp}}\n" +
    "    <span ng-show=\"board[307].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[307].target, 'text-' + (board[307].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[308].type, board[308].action]\" class=\"box\">\n" +
    "    {{board[308].hp}}\n" +
    "    <span ng-show=\"board[308].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[308].target, 'text-' + (board[308].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[309].type, board[309].action]\" class=\"box\">\n" +
    "    {{board[309].hp}}\n" +
    "    <span ng-show=\"board[309].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[309].target, 'text-' + (board[309].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[310].type, board[310].action]\" class=\"box\">\n" +
    "    {{board[310].hp}}\n" +
    "    <span ng-show=\"board[310].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[310].target, 'text-' + (board[310].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[311].type, board[311].action]\" class=\"box\">\n" +
    "    {{board[311].hp}}\n" +
    "    <span ng-show=\"board[311].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[311].target, 'text-' + (board[311].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[312].type, board[312].action]\" class=\"box\">\n" +
    "    {{board[312].hp}}\n" +
    "    <span ng-show=\"board[312].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[312].target, 'text-' + (board[312].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[313].type, board[313].action]\" class=\"box\">\n" +
    "    {{board[313].hp}}\n" +
    "    <span ng-show=\"board[313].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[313].target, 'text-' + (board[313].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[314].type, board[314].action]\" class=\"box\">\n" +
    "    {{board[314].hp}}\n" +
    "    <span ng-show=\"board[314].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[314].target, 'text-' + (board[314].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[315].type, board[315].action]\" class=\"box\">\n" +
    "    {{board[315].hp}}\n" +
    "    <span ng-show=\"board[315].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[315].target, 'text-' + (board[315].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[316].type, board[316].action]\" class=\"box\">\n" +
    "    {{board[316].hp}}\n" +
    "    <span ng-show=\"board[316].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[316].target, 'text-' + (board[316].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[317].type, board[317].action]\" class=\"box\">\n" +
    "    {{board[317].hp}}\n" +
    "    <span ng-show=\"board[317].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[317].target, 'text-' + (board[317].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[318].type, board[318].action]\" class=\"box\">\n" +
    "    {{board[318].hp}}\n" +
    "    <span ng-show=\"board[318].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[318].target, 'text-' + (board[318].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[319].type, board[319].action]\" class=\"box\">\n" +
    "    {{board[319].hp}}\n" +
    "    <span ng-show=\"board[319].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[319].target, 'text-' + (board[319].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[320].type, board[320].action]\" class=\"box\">\n" +
    "    {{board[320].hp}}\n" +
    "    <span ng-show=\"board[320].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[320].target, 'text-' + (board[320].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[321].type, board[321].action]\" class=\"box\">\n" +
    "    {{board[321].hp}}\n" +
    "    <span ng-show=\"board[321].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[321].target, 'text-' + (board[321].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[322].type, board[322].action]\" class=\"box\">\n" +
    "    {{board[322].hp}}\n" +
    "    <span ng-show=\"board[322].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[322].target, 'text-' + (board[322].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[323].type, board[323].action]\" class=\"box\">\n" +
    "    {{board[323].hp}}\n" +
    "    <span ng-show=\"board[323].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[323].target, 'text-' + (board[323].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[324].type, board[324].action]\" class=\"box\">\n" +
    "    {{board[324].hp}}\n" +
    "    <span ng-show=\"board[324].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[324].target, 'text-' + (board[324].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[325].type, board[325].action]\" class=\"box\">\n" +
    "    {{board[325].hp}}\n" +
    "    <span ng-show=\"board[325].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[325].target, 'text-' + (board[325].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[326].type, board[326].action]\" class=\"box\">\n" +
    "    {{board[326].hp}}\n" +
    "    <span ng-show=\"board[326].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[326].target, 'text-' + (board[326].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[327].type, board[327].action]\" class=\"box\">\n" +
    "    {{board[327].hp}}\n" +
    "    <span ng-show=\"board[327].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[327].target, 'text-' + (board[327].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[328].type, board[328].action]\" class=\"box\">\n" +
    "    {{board[328].hp}}\n" +
    "    <span ng-show=\"board[328].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[328].target, 'text-' + (board[328].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[329].type, board[329].action]\" class=\"box\">\n" +
    "    {{board[329].hp}}\n" +
    "    <span ng-show=\"board[329].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[329].target, 'text-' + (board[329].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[330].type, board[330].action]\" class=\"box\">\n" +
    "    {{board[330].hp}}\n" +
    "    <span ng-show=\"board[330].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[330].target, 'text-' + (board[330].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[331].type, board[331].action]\" class=\"box\">\n" +
    "    {{board[331].hp}}\n" +
    "    <span ng-show=\"board[331].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[331].target, 'text-' + (board[331].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[332].type, board[332].action]\" class=\"box\">\n" +
    "    {{board[332].hp}}\n" +
    "    <span ng-show=\"board[332].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[332].target, 'text-' + (board[332].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[333].type, board[333].action]\" class=\"box\">\n" +
    "    {{board[333].hp}}\n" +
    "    <span ng-show=\"board[333].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[333].target, 'text-' + (board[333].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[334].type, board[334].action]\" class=\"box\">\n" +
    "    {{board[334].hp}}\n" +
    "    <span ng-show=\"board[334].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[334].target, 'text-' + (board[334].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[335].type, board[335].action]\" class=\"box\">\n" +
    "    {{board[335].hp}}\n" +
    "    <span ng-show=\"board[335].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[335].target, 'text-' + (board[335].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[336].type, board[336].action]\" class=\"box\">\n" +
    "    {{board[336].hp}}\n" +
    "    <span ng-show=\"board[336].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[336].target, 'text-' + (board[336].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[337].type, board[337].action]\" class=\"box\">\n" +
    "    {{board[337].hp}}\n" +
    "    <span ng-show=\"board[337].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[337].target, 'text-' + (board[337].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[338].type, board[338].action]\" class=\"box\">\n" +
    "    {{board[338].hp}}\n" +
    "    <span ng-show=\"board[338].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[338].target, 'text-' + (board[338].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[339].type, board[339].action]\" class=\"box\">\n" +
    "    {{board[339].hp}}\n" +
    "    <span ng-show=\"board[339].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[339].target, 'text-' + (board[339].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[340].type, board[340].action]\" class=\"box\">\n" +
    "    {{board[340].hp}}\n" +
    "    <span ng-show=\"board[340].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[340].target, 'text-' + (board[340].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[341].type, board[341].action]\" class=\"box\">\n" +
    "    {{board[341].hp}}\n" +
    "    <span ng-show=\"board[341].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[341].target, 'text-' + (board[341].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[342].type, board[342].action]\" class=\"box\">\n" +
    "    {{board[342].hp}}\n" +
    "    <span ng-show=\"board[342].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[342].target, 'text-' + (board[342].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[343].type, board[343].action]\" class=\"box\">\n" +
    "    {{board[343].hp}}\n" +
    "    <span ng-show=\"board[343].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[343].target, 'text-' + (board[343].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[344].type, board[344].action]\" class=\"box\">\n" +
    "    {{board[344].hp}}\n" +
    "    <span ng-show=\"board[344].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[344].target, 'text-' + (board[344].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[345].type, board[345].action]\" class=\"box\">\n" +
    "    {{board[345].hp}}\n" +
    "    <span ng-show=\"board[345].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[345].target, 'text-' + (board[345].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[346].type, board[346].action]\" class=\"box\">\n" +
    "    {{board[346].hp}}\n" +
    "    <span ng-show=\"board[346].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[346].target, 'text-' + (board[346].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[347].type, board[347].action]\" class=\"box\">\n" +
    "    {{board[347].hp}}\n" +
    "    <span ng-show=\"board[347].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[347].target, 'text-' + (board[347].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[348].type, board[348].action]\" class=\"box\">\n" +
    "    {{board[348].hp}}\n" +
    "    <span ng-show=\"board[348].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[348].target, 'text-' + (board[348].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[349].type, board[349].action]\" class=\"box\">\n" +
    "    {{board[349].hp}}\n" +
    "    <span ng-show=\"board[349].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[349].target, 'text-' + (board[349].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[350].type, board[350].action]\" class=\"box\">\n" +
    "    {{board[350].hp}}\n" +
    "    <span ng-show=\"board[350].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[350].target, 'text-' + (board[350].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[351].type, board[351].action]\" class=\"box\">\n" +
    "    {{board[351].hp}}\n" +
    "    <span ng-show=\"board[351].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[351].target, 'text-' + (board[351].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[352].type, board[352].action]\" class=\"box\">\n" +
    "    {{board[352].hp}}\n" +
    "    <span ng-show=\"board[352].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[352].target, 'text-' + (board[352].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[353].type, board[353].action]\" class=\"box\">\n" +
    "    {{board[353].hp}}\n" +
    "    <span ng-show=\"board[353].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[353].target, 'text-' + (board[353].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[354].type, board[354].action]\" class=\"box\">\n" +
    "    {{board[354].hp}}\n" +
    "    <span ng-show=\"board[354].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[354].target, 'text-' + (board[354].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[355].type, board[355].action]\" class=\"box\">\n" +
    "    {{board[355].hp}}\n" +
    "    <span ng-show=\"board[355].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[355].target, 'text-' + (board[355].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[356].type, board[356].action]\" class=\"box\">\n" +
    "    {{board[356].hp}}\n" +
    "    <span ng-show=\"board[356].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[356].target, 'text-' + (board[356].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[357].type, board[357].action]\" class=\"box\">\n" +
    "    {{board[357].hp}}\n" +
    "    <span ng-show=\"board[357].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[357].target, 'text-' + (board[357].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[358].type, board[358].action]\" class=\"box\">\n" +
    "    {{board[358].hp}}\n" +
    "    <span ng-show=\"board[358].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[358].target, 'text-' + (board[358].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[359].type, board[359].action]\" class=\"box\">\n" +
    "    {{board[359].hp}}\n" +
    "    <span ng-show=\"board[359].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[359].target, 'text-' + (board[359].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "  <span ng-class=\"[board[360].type, board[360].action]\" class=\"box\">\n" +
    "    {{board[360].hp}}\n" +
    "    <span ng-show=\"board[360].target\"\n" +
    "          ng-class=\"['glyphicon-arrow-' + board[360].target, 'text-' + (board[360].action === 'move' ? 'primary' : 'danger')]\"\n" +
    "          class=\"glyphicon\"></span>\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);
