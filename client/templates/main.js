angular.module('templates-main', ['/client/src/app/robots/robots.tpl.html', '/client/src/common/directives/rgMap.tpl.html']);

angular.module("/client/src/app/robots/robots.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/robots.tpl.html",
    "<script type=\"text/ng-template\" id=\"/client/vendor/src/app/robots/codemirror.tpl.html\">\n" +
    "  <textarea ui-codemirror=\"codeMirrorOptions(robot.code)\" ng-model=\"robot.code\"></textarea>\n" +
    "</script>\n" +
    "\n" +
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
    "        <div class=\"row editor\">\n" +
    "\n" +
    "          <!-- left column with code mirror -->\n" +
    "          <div class=\"col-md-8\">\n" +
    "            <form class=\"form-inline\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <input type=\"text\" ng-model=\"robot.name\"\n" +
    "                       id=\"newRobotNameInput\" class=\"form-control\" />\n" +
    "              </div>\n" +
    "              <button ng-click=\"updateRobot($index)\"\n" +
    "                      class=\"btn btn-default\">Save</button>\n" +
    "              <button ng-if=\"!$first\" ng-click=\"updateRobot($index, true)\"\n" +
    "                      class=\"btn btn-danger\">Delete</button>\n" +
    "            </form>\n" +
    "            \n" +
    "            <!-- some hacky shit to make ui codemirror work properly w/ ng-repeat -->\n" +
    "            <div ng-if=\"robot.active\"\n" +
    "                 ng-include=\"'/client/vendor/src/app/robots/codemirror.tpl.html'\"></div>\n" +
    "          </div>\n" +
    "\n" +
    "          <!-- right column with game map -->\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <p class=\"lead row\">\n" +
    "              <span class=\"text-danger\">{{robots[$index].name}}</span> vs\n" +
    "              <span class=\"text-primary\">{{robots[opponent.index].name}}</span>\n" +
    "            </p>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"btn-group\" ng-init=\"opponent.index = 0\">\n" +
    "                <button class=\"btn btn-default dropdown-toggle\">\n" +
    "                  Select opponent&nbsp;<span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu\">\n" +
    "                  <li ng-repeat=\"robot in robots\">\n" +
    "                    <a ng-click=\"opponent.index = $index\">{{robot.name}}</a>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <button ng-click=\"runMatch($index, opponent.index)\"\n" +
    "                      class=\"btn btn-primary\">Run match</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"history\">\n" +
    "              <rg-map board=\"history[match.turn].board\" class=\"row\"></rg-map>\n" +
    "\n" +
    "              <div class=\"row\">\n" +
    "                <input type=\"range\" ng-model=\"match.turn\"\n" +
    "                       min=\"0\" max=\"{{history.length-1}}\" step=\"1\" value=\"0\"/>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"row\">\n" +
    "                Turn: {{match.turn}}\n" +
    "                <span class=\"text-danger\">\n" +
    "                  {{match.player1}}: {{history[match.turn].scores[0]}}\n" +
    "                </span>\n" +
    "                <span class=\"text-primary\">\n" +
    "                  {{match.player2}}: {{history[match.turn].scores[1]}}\n" +
    "                </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
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
    "  <span ng-class=\"board[0].type\" class=\"box\">\n" +
    "    {{board[0].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[1].type\" class=\"box\">\n" +
    "    {{board[1].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[2].type\" class=\"box\">\n" +
    "    {{board[2].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[3].type\" class=\"box\">\n" +
    "    {{board[3].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[4].type\" class=\"box\">\n" +
    "    {{board[4].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[5].type\" class=\"box\">\n" +
    "    {{board[5].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[6].type\" class=\"box\">\n" +
    "    {{board[6].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[7].type\" class=\"box\">\n" +
    "    {{board[7].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[8].type\" class=\"box\">\n" +
    "    {{board[8].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[9].type\" class=\"box\">\n" +
    "    {{board[9].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[10].type\" class=\"box\">\n" +
    "    {{board[10].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[11].type\" class=\"box\">\n" +
    "    {{board[11].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[12].type\" class=\"box\">\n" +
    "    {{board[12].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[13].type\" class=\"box\">\n" +
    "    {{board[13].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[14].type\" class=\"box\">\n" +
    "    {{board[14].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[15].type\" class=\"box\">\n" +
    "    {{board[15].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[16].type\" class=\"box\">\n" +
    "    {{board[16].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[17].type\" class=\"box\">\n" +
    "    {{board[17].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[18].type\" class=\"box\">\n" +
    "    {{board[18].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[19].type\" class=\"box\">\n" +
    "    {{board[19].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[20].type\" class=\"box\">\n" +
    "    {{board[20].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[21].type\" class=\"box\">\n" +
    "    {{board[21].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[22].type\" class=\"box\">\n" +
    "    {{board[22].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[23].type\" class=\"box\">\n" +
    "    {{board[23].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[24].type\" class=\"box\">\n" +
    "    {{board[24].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[25].type\" class=\"box\">\n" +
    "    {{board[25].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[26].type\" class=\"box\">\n" +
    "    {{board[26].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[27].type\" class=\"box\">\n" +
    "    {{board[27].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[28].type\" class=\"box\">\n" +
    "    {{board[28].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[29].type\" class=\"box\">\n" +
    "    {{board[29].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[30].type\" class=\"box\">\n" +
    "    {{board[30].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[31].type\" class=\"box\">\n" +
    "    {{board[31].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[32].type\" class=\"box\">\n" +
    "    {{board[32].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[33].type\" class=\"box\">\n" +
    "    {{board[33].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[34].type\" class=\"box\">\n" +
    "    {{board[34].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[35].type\" class=\"box\">\n" +
    "    {{board[35].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[36].type\" class=\"box\">\n" +
    "    {{board[36].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[37].type\" class=\"box\">\n" +
    "    {{board[37].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[38].type\" class=\"box\">\n" +
    "    {{board[38].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[39].type\" class=\"box\">\n" +
    "    {{board[39].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[40].type\" class=\"box\">\n" +
    "    {{board[40].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[41].type\" class=\"box\">\n" +
    "    {{board[41].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[42].type\" class=\"box\">\n" +
    "    {{board[42].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[43].type\" class=\"box\">\n" +
    "    {{board[43].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[44].type\" class=\"box\">\n" +
    "    {{board[44].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[45].type\" class=\"box\">\n" +
    "    {{board[45].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[46].type\" class=\"box\">\n" +
    "    {{board[46].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[47].type\" class=\"box\">\n" +
    "    {{board[47].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[48].type\" class=\"box\">\n" +
    "    {{board[48].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[49].type\" class=\"box\">\n" +
    "    {{board[49].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[50].type\" class=\"box\">\n" +
    "    {{board[50].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[51].type\" class=\"box\">\n" +
    "    {{board[51].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[52].type\" class=\"box\">\n" +
    "    {{board[52].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[53].type\" class=\"box\">\n" +
    "    {{board[53].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[54].type\" class=\"box\">\n" +
    "    {{board[54].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[55].type\" class=\"box\">\n" +
    "    {{board[55].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[56].type\" class=\"box\">\n" +
    "    {{board[56].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[57].type\" class=\"box\">\n" +
    "    {{board[57].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[58].type\" class=\"box\">\n" +
    "    {{board[58].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[59].type\" class=\"box\">\n" +
    "    {{board[59].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[60].type\" class=\"box\">\n" +
    "    {{board[60].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[61].type\" class=\"box\">\n" +
    "    {{board[61].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[62].type\" class=\"box\">\n" +
    "    {{board[62].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[63].type\" class=\"box\">\n" +
    "    {{board[63].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[64].type\" class=\"box\">\n" +
    "    {{board[64].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[65].type\" class=\"box\">\n" +
    "    {{board[65].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[66].type\" class=\"box\">\n" +
    "    {{board[66].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[67].type\" class=\"box\">\n" +
    "    {{board[67].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[68].type\" class=\"box\">\n" +
    "    {{board[68].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[69].type\" class=\"box\">\n" +
    "    {{board[69].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[70].type\" class=\"box\">\n" +
    "    {{board[70].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[71].type\" class=\"box\">\n" +
    "    {{board[71].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[72].type\" class=\"box\">\n" +
    "    {{board[72].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[73].type\" class=\"box\">\n" +
    "    {{board[73].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[74].type\" class=\"box\">\n" +
    "    {{board[74].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[75].type\" class=\"box\">\n" +
    "    {{board[75].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[76].type\" class=\"box\">\n" +
    "    {{board[76].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[77].type\" class=\"box\">\n" +
    "    {{board[77].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[78].type\" class=\"box\">\n" +
    "    {{board[78].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[79].type\" class=\"box\">\n" +
    "    {{board[79].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[80].type\" class=\"box\">\n" +
    "    {{board[80].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[81].type\" class=\"box\">\n" +
    "    {{board[81].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[82].type\" class=\"box\">\n" +
    "    {{board[82].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[83].type\" class=\"box\">\n" +
    "    {{board[83].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[84].type\" class=\"box\">\n" +
    "    {{board[84].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[85].type\" class=\"box\">\n" +
    "    {{board[85].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[86].type\" class=\"box\">\n" +
    "    {{board[86].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[87].type\" class=\"box\">\n" +
    "    {{board[87].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[88].type\" class=\"box\">\n" +
    "    {{board[88].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[89].type\" class=\"box\">\n" +
    "    {{board[89].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[90].type\" class=\"box\">\n" +
    "    {{board[90].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[91].type\" class=\"box\">\n" +
    "    {{board[91].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[92].type\" class=\"box\">\n" +
    "    {{board[92].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[93].type\" class=\"box\">\n" +
    "    {{board[93].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[94].type\" class=\"box\">\n" +
    "    {{board[94].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[95].type\" class=\"box\">\n" +
    "    {{board[95].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[96].type\" class=\"box\">\n" +
    "    {{board[96].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[97].type\" class=\"box\">\n" +
    "    {{board[97].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[98].type\" class=\"box\">\n" +
    "    {{board[98].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[99].type\" class=\"box\">\n" +
    "    {{board[99].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[100].type\" class=\"box\">\n" +
    "    {{board[100].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[101].type\" class=\"box\">\n" +
    "    {{board[101].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[102].type\" class=\"box\">\n" +
    "    {{board[102].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[103].type\" class=\"box\">\n" +
    "    {{board[103].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[104].type\" class=\"box\">\n" +
    "    {{board[104].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[105].type\" class=\"box\">\n" +
    "    {{board[105].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[106].type\" class=\"box\">\n" +
    "    {{board[106].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[107].type\" class=\"box\">\n" +
    "    {{board[107].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[108].type\" class=\"box\">\n" +
    "    {{board[108].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[109].type\" class=\"box\">\n" +
    "    {{board[109].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[110].type\" class=\"box\">\n" +
    "    {{board[110].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[111].type\" class=\"box\">\n" +
    "    {{board[111].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[112].type\" class=\"box\">\n" +
    "    {{board[112].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[113].type\" class=\"box\">\n" +
    "    {{board[113].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[114].type\" class=\"box\">\n" +
    "    {{board[114].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[115].type\" class=\"box\">\n" +
    "    {{board[115].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[116].type\" class=\"box\">\n" +
    "    {{board[116].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[117].type\" class=\"box\">\n" +
    "    {{board[117].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[118].type\" class=\"box\">\n" +
    "    {{board[118].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[119].type\" class=\"box\">\n" +
    "    {{board[119].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[120].type\" class=\"box\">\n" +
    "    {{board[120].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[121].type\" class=\"box\">\n" +
    "    {{board[121].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[122].type\" class=\"box\">\n" +
    "    {{board[122].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[123].type\" class=\"box\">\n" +
    "    {{board[123].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[124].type\" class=\"box\">\n" +
    "    {{board[124].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[125].type\" class=\"box\">\n" +
    "    {{board[125].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[126].type\" class=\"box\">\n" +
    "    {{board[126].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[127].type\" class=\"box\">\n" +
    "    {{board[127].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[128].type\" class=\"box\">\n" +
    "    {{board[128].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[129].type\" class=\"box\">\n" +
    "    {{board[129].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[130].type\" class=\"box\">\n" +
    "    {{board[130].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[131].type\" class=\"box\">\n" +
    "    {{board[131].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[132].type\" class=\"box\">\n" +
    "    {{board[132].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[133].type\" class=\"box\">\n" +
    "    {{board[133].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[134].type\" class=\"box\">\n" +
    "    {{board[134].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[135].type\" class=\"box\">\n" +
    "    {{board[135].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[136].type\" class=\"box\">\n" +
    "    {{board[136].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[137].type\" class=\"box\">\n" +
    "    {{board[137].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[138].type\" class=\"box\">\n" +
    "    {{board[138].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[139].type\" class=\"box\">\n" +
    "    {{board[139].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[140].type\" class=\"box\">\n" +
    "    {{board[140].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[141].type\" class=\"box\">\n" +
    "    {{board[141].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[142].type\" class=\"box\">\n" +
    "    {{board[142].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[143].type\" class=\"box\">\n" +
    "    {{board[143].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[144].type\" class=\"box\">\n" +
    "    {{board[144].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[145].type\" class=\"box\">\n" +
    "    {{board[145].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[146].type\" class=\"box\">\n" +
    "    {{board[146].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[147].type\" class=\"box\">\n" +
    "    {{board[147].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[148].type\" class=\"box\">\n" +
    "    {{board[148].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[149].type\" class=\"box\">\n" +
    "    {{board[149].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[150].type\" class=\"box\">\n" +
    "    {{board[150].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[151].type\" class=\"box\">\n" +
    "    {{board[151].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[152].type\" class=\"box\">\n" +
    "    {{board[152].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[153].type\" class=\"box\">\n" +
    "    {{board[153].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[154].type\" class=\"box\">\n" +
    "    {{board[154].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[155].type\" class=\"box\">\n" +
    "    {{board[155].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[156].type\" class=\"box\">\n" +
    "    {{board[156].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[157].type\" class=\"box\">\n" +
    "    {{board[157].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[158].type\" class=\"box\">\n" +
    "    {{board[158].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[159].type\" class=\"box\">\n" +
    "    {{board[159].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[160].type\" class=\"box\">\n" +
    "    {{board[160].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[161].type\" class=\"box\">\n" +
    "    {{board[161].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[162].type\" class=\"box\">\n" +
    "    {{board[162].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[163].type\" class=\"box\">\n" +
    "    {{board[163].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[164].type\" class=\"box\">\n" +
    "    {{board[164].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[165].type\" class=\"box\">\n" +
    "    {{board[165].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[166].type\" class=\"box\">\n" +
    "    {{board[166].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[167].type\" class=\"box\">\n" +
    "    {{board[167].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[168].type\" class=\"box\">\n" +
    "    {{board[168].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[169].type\" class=\"box\">\n" +
    "    {{board[169].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[170].type\" class=\"box\">\n" +
    "    {{board[170].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[171].type\" class=\"box\">\n" +
    "    {{board[171].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[172].type\" class=\"box\">\n" +
    "    {{board[172].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[173].type\" class=\"box\">\n" +
    "    {{board[173].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[174].type\" class=\"box\">\n" +
    "    {{board[174].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[175].type\" class=\"box\">\n" +
    "    {{board[175].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[176].type\" class=\"box\">\n" +
    "    {{board[176].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[177].type\" class=\"box\">\n" +
    "    {{board[177].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[178].type\" class=\"box\">\n" +
    "    {{board[178].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[179].type\" class=\"box\">\n" +
    "    {{board[179].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[180].type\" class=\"box\">\n" +
    "    {{board[180].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[181].type\" class=\"box\">\n" +
    "    {{board[181].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[182].type\" class=\"box\">\n" +
    "    {{board[182].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[183].type\" class=\"box\">\n" +
    "    {{board[183].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[184].type\" class=\"box\">\n" +
    "    {{board[184].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[185].type\" class=\"box\">\n" +
    "    {{board[185].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[186].type\" class=\"box\">\n" +
    "    {{board[186].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[187].type\" class=\"box\">\n" +
    "    {{board[187].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[188].type\" class=\"box\">\n" +
    "    {{board[188].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[189].type\" class=\"box\">\n" +
    "    {{board[189].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[190].type\" class=\"box\">\n" +
    "    {{board[190].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[191].type\" class=\"box\">\n" +
    "    {{board[191].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[192].type\" class=\"box\">\n" +
    "    {{board[192].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[193].type\" class=\"box\">\n" +
    "    {{board[193].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[194].type\" class=\"box\">\n" +
    "    {{board[194].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[195].type\" class=\"box\">\n" +
    "    {{board[195].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[196].type\" class=\"box\">\n" +
    "    {{board[196].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[197].type\" class=\"box\">\n" +
    "    {{board[197].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[198].type\" class=\"box\">\n" +
    "    {{board[198].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[199].type\" class=\"box\">\n" +
    "    {{board[199].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[200].type\" class=\"box\">\n" +
    "    {{board[200].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[201].type\" class=\"box\">\n" +
    "    {{board[201].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[202].type\" class=\"box\">\n" +
    "    {{board[202].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[203].type\" class=\"box\">\n" +
    "    {{board[203].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[204].type\" class=\"box\">\n" +
    "    {{board[204].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[205].type\" class=\"box\">\n" +
    "    {{board[205].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[206].type\" class=\"box\">\n" +
    "    {{board[206].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[207].type\" class=\"box\">\n" +
    "    {{board[207].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[208].type\" class=\"box\">\n" +
    "    {{board[208].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[209].type\" class=\"box\">\n" +
    "    {{board[209].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[210].type\" class=\"box\">\n" +
    "    {{board[210].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[211].type\" class=\"box\">\n" +
    "    {{board[211].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[212].type\" class=\"box\">\n" +
    "    {{board[212].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[213].type\" class=\"box\">\n" +
    "    {{board[213].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[214].type\" class=\"box\">\n" +
    "    {{board[214].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[215].type\" class=\"box\">\n" +
    "    {{board[215].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[216].type\" class=\"box\">\n" +
    "    {{board[216].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[217].type\" class=\"box\">\n" +
    "    {{board[217].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[218].type\" class=\"box\">\n" +
    "    {{board[218].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[219].type\" class=\"box\">\n" +
    "    {{board[219].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[220].type\" class=\"box\">\n" +
    "    {{board[220].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[221].type\" class=\"box\">\n" +
    "    {{board[221].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[222].type\" class=\"box\">\n" +
    "    {{board[222].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[223].type\" class=\"box\">\n" +
    "    {{board[223].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[224].type\" class=\"box\">\n" +
    "    {{board[224].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[225].type\" class=\"box\">\n" +
    "    {{board[225].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[226].type\" class=\"box\">\n" +
    "    {{board[226].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[227].type\" class=\"box\">\n" +
    "    {{board[227].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[228].type\" class=\"box\">\n" +
    "    {{board[228].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[229].type\" class=\"box\">\n" +
    "    {{board[229].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[230].type\" class=\"box\">\n" +
    "    {{board[230].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[231].type\" class=\"box\">\n" +
    "    {{board[231].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[232].type\" class=\"box\">\n" +
    "    {{board[232].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[233].type\" class=\"box\">\n" +
    "    {{board[233].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[234].type\" class=\"box\">\n" +
    "    {{board[234].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[235].type\" class=\"box\">\n" +
    "    {{board[235].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[236].type\" class=\"box\">\n" +
    "    {{board[236].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[237].type\" class=\"box\">\n" +
    "    {{board[237].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[238].type\" class=\"box\">\n" +
    "    {{board[238].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[239].type\" class=\"box\">\n" +
    "    {{board[239].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[240].type\" class=\"box\">\n" +
    "    {{board[240].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[241].type\" class=\"box\">\n" +
    "    {{board[241].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[242].type\" class=\"box\">\n" +
    "    {{board[242].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[243].type\" class=\"box\">\n" +
    "    {{board[243].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[244].type\" class=\"box\">\n" +
    "    {{board[244].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[245].type\" class=\"box\">\n" +
    "    {{board[245].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[246].type\" class=\"box\">\n" +
    "    {{board[246].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[247].type\" class=\"box\">\n" +
    "    {{board[247].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[248].type\" class=\"box\">\n" +
    "    {{board[248].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[249].type\" class=\"box\">\n" +
    "    {{board[249].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[250].type\" class=\"box\">\n" +
    "    {{board[250].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[251].type\" class=\"box\">\n" +
    "    {{board[251].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[252].type\" class=\"box\">\n" +
    "    {{board[252].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[253].type\" class=\"box\">\n" +
    "    {{board[253].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[254].type\" class=\"box\">\n" +
    "    {{board[254].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[255].type\" class=\"box\">\n" +
    "    {{board[255].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[256].type\" class=\"box\">\n" +
    "    {{board[256].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[257].type\" class=\"box\">\n" +
    "    {{board[257].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[258].type\" class=\"box\">\n" +
    "    {{board[258].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[259].type\" class=\"box\">\n" +
    "    {{board[259].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[260].type\" class=\"box\">\n" +
    "    {{board[260].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[261].type\" class=\"box\">\n" +
    "    {{board[261].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[262].type\" class=\"box\">\n" +
    "    {{board[262].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[263].type\" class=\"box\">\n" +
    "    {{board[263].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[264].type\" class=\"box\">\n" +
    "    {{board[264].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[265].type\" class=\"box\">\n" +
    "    {{board[265].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[266].type\" class=\"box\">\n" +
    "    {{board[266].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[267].type\" class=\"box\">\n" +
    "    {{board[267].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[268].type\" class=\"box\">\n" +
    "    {{board[268].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[269].type\" class=\"box\">\n" +
    "    {{board[269].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[270].type\" class=\"box\">\n" +
    "    {{board[270].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[271].type\" class=\"box\">\n" +
    "    {{board[271].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[272].type\" class=\"box\">\n" +
    "    {{board[272].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[273].type\" class=\"box\">\n" +
    "    {{board[273].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[274].type\" class=\"box\">\n" +
    "    {{board[274].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[275].type\" class=\"box\">\n" +
    "    {{board[275].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[276].type\" class=\"box\">\n" +
    "    {{board[276].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[277].type\" class=\"box\">\n" +
    "    {{board[277].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[278].type\" class=\"box\">\n" +
    "    {{board[278].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[279].type\" class=\"box\">\n" +
    "    {{board[279].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[280].type\" class=\"box\">\n" +
    "    {{board[280].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[281].type\" class=\"box\">\n" +
    "    {{board[281].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[282].type\" class=\"box\">\n" +
    "    {{board[282].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[283].type\" class=\"box\">\n" +
    "    {{board[283].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[284].type\" class=\"box\">\n" +
    "    {{board[284].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[285].type\" class=\"box\">\n" +
    "    {{board[285].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[286].type\" class=\"box\">\n" +
    "    {{board[286].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[287].type\" class=\"box\">\n" +
    "    {{board[287].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[288].type\" class=\"box\">\n" +
    "    {{board[288].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[289].type\" class=\"box\">\n" +
    "    {{board[289].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[290].type\" class=\"box\">\n" +
    "    {{board[290].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[291].type\" class=\"box\">\n" +
    "    {{board[291].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[292].type\" class=\"box\">\n" +
    "    {{board[292].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[293].type\" class=\"box\">\n" +
    "    {{board[293].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[294].type\" class=\"box\">\n" +
    "    {{board[294].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[295].type\" class=\"box\">\n" +
    "    {{board[295].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[296].type\" class=\"box\">\n" +
    "    {{board[296].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[297].type\" class=\"box\">\n" +
    "    {{board[297].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[298].type\" class=\"box\">\n" +
    "    {{board[298].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[299].type\" class=\"box\">\n" +
    "    {{board[299].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[300].type\" class=\"box\">\n" +
    "    {{board[300].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[301].type\" class=\"box\">\n" +
    "    {{board[301].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[302].type\" class=\"box\">\n" +
    "    {{board[302].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[303].type\" class=\"box\">\n" +
    "    {{board[303].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[304].type\" class=\"box\">\n" +
    "    {{board[304].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[305].type\" class=\"box\">\n" +
    "    {{board[305].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[306].type\" class=\"box\">\n" +
    "    {{board[306].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[307].type\" class=\"box\">\n" +
    "    {{board[307].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[308].type\" class=\"box\">\n" +
    "    {{board[308].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[309].type\" class=\"box\">\n" +
    "    {{board[309].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[310].type\" class=\"box\">\n" +
    "    {{board[310].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[311].type\" class=\"box\">\n" +
    "    {{board[311].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[312].type\" class=\"box\">\n" +
    "    {{board[312].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[313].type\" class=\"box\">\n" +
    "    {{board[313].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[314].type\" class=\"box\">\n" +
    "    {{board[314].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[315].type\" class=\"box\">\n" +
    "    {{board[315].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[316].type\" class=\"box\">\n" +
    "    {{board[316].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[317].type\" class=\"box\">\n" +
    "    {{board[317].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[318].type\" class=\"box\">\n" +
    "    {{board[318].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[319].type\" class=\"box\">\n" +
    "    {{board[319].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[320].type\" class=\"box\">\n" +
    "    {{board[320].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[321].type\" class=\"box\">\n" +
    "    {{board[321].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[322].type\" class=\"box\">\n" +
    "    {{board[322].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[323].type\" class=\"box\">\n" +
    "    {{board[323].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[324].type\" class=\"box\">\n" +
    "    {{board[324].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[325].type\" class=\"box\">\n" +
    "    {{board[325].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[326].type\" class=\"box\">\n" +
    "    {{board[326].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[327].type\" class=\"box\">\n" +
    "    {{board[327].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[328].type\" class=\"box\">\n" +
    "    {{board[328].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[329].type\" class=\"box\">\n" +
    "    {{board[329].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[330].type\" class=\"box\">\n" +
    "    {{board[330].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[331].type\" class=\"box\">\n" +
    "    {{board[331].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[332].type\" class=\"box\">\n" +
    "    {{board[332].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[333].type\" class=\"box\">\n" +
    "    {{board[333].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[334].type\" class=\"box\">\n" +
    "    {{board[334].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[335].type\" class=\"box\">\n" +
    "    {{board[335].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[336].type\" class=\"box\">\n" +
    "    {{board[336].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[337].type\" class=\"box\">\n" +
    "    {{board[337].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[338].type\" class=\"box\">\n" +
    "    {{board[338].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[339].type\" class=\"box\">\n" +
    "    {{board[339].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[340].type\" class=\"box\">\n" +
    "    {{board[340].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[341].type\" class=\"box\">\n" +
    "    {{board[341].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[342].type\" class=\"box\">\n" +
    "    {{board[342].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[343].type\" class=\"box\">\n" +
    "    {{board[343].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[344].type\" class=\"box\">\n" +
    "    {{board[344].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[345].type\" class=\"box\">\n" +
    "    {{board[345].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[346].type\" class=\"box\">\n" +
    "    {{board[346].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[347].type\" class=\"box\">\n" +
    "    {{board[347].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[348].type\" class=\"box\">\n" +
    "    {{board[348].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[349].type\" class=\"box\">\n" +
    "    {{board[349].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[350].type\" class=\"box\">\n" +
    "    {{board[350].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[351].type\" class=\"box\">\n" +
    "    {{board[351].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[352].type\" class=\"box\">\n" +
    "    {{board[352].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[353].type\" class=\"box\">\n" +
    "    {{board[353].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[354].type\" class=\"box\">\n" +
    "    {{board[354].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[355].type\" class=\"box\">\n" +
    "    {{board[355].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[356].type\" class=\"box\">\n" +
    "    {{board[356].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[357].type\" class=\"box\">\n" +
    "    {{board[357].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[358].type\" class=\"box\">\n" +
    "    {{board[358].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[359].type\" class=\"box\">\n" +
    "    {{board[359].hp}}\n" +
    "  </span>\n" +
    "  <span ng-class=\"board[360].type\" class=\"box\">\n" +
    "    {{board[360].hp}}\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);
