angular.module('templates-main', ['/client/src/app/robots/editor/editor.tpl.html', '/client/src/app/robots/match/match.tpl.html', '/client/src/app/robots/robots.tpl.html', '/client/src/common/directives/rgMap.tpl.html']);

angular.module("/client/src/app/robots/editor/editor.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/editor/editor.tpl.html",
    "<div ng-controller=\"EditorCtrl\">\n" +
    "  <form name=\"robotForm\" class=\"form-inline\" novalidate>\n" +
    "    <div class=\"form-group\" ng-class=\"{ 'has-error': robotForm.robotName.$dirty && !robotForm.robotName.$valid }\">\n" +
    "      <input type=\"text\" ng-model=\"robot.name\"\n" +
    "             ng-minlength=\"2\" ng-maxlength=\"20\"\n" +
    "             keep-model-value=\"\"\n" +
    "             name=\"robotName\" required class=\"form-control\" />\n" +
    "    </div>\n" +
    "    <button ng-click=\"updateRobot($index)\"\n" +
    "            class=\"btn btn-default\">Save</button>\n" +
    "    <filechooser ng-if=\"$first\" button-class=\"btn btn-default\"\n" +
    "                 change=\"importFile(files)\">Import from file</filechooser>\n" +
    "    <button ng-if=\"!$first\" ng-click=\"updateRobot($index, true)\"\n" +
    "            class=\"btn btn-danger\">Delete</button>\n" +
    "  </form>\n" +
    "\n" +
    "  <div>\n" +
    "    <div ui-codemirror=\"codeMirrorOptions\"\n" +
    "         ui-refresh=\"robot.init\"\n" +
    "         ng-model=\"robot.code\"></div>\n" +
    "    <select ng-model=\"codeMirrorOptions.theme\"\n" +
    "            ng-options=\"t for t in themes\"\n" +
    "            class=\"mt10\"></select>\n" +
    "    &nbsp;\n" +
    "    <label>\n" +
    "      <input type=\"checkbox\" ng-model=\"vim\" ng-change=\"vimToggle()\" />\n" +
    "      Vim mode\n" +
    "    </label>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/client/src/app/robots/match/match.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/match/match.tpl.html",
    "<div ng-controller=\"MatchCtrl\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <p class=\"lead\">\n" +
    "        <span class=\"text-danger\">{{robots[$index].name}}</span> vs\n" +
    "        <span class=\"text-primary\">{{robots[opponent.index].name}}</span>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <div class=\"btn-group\" ng-init=\"opponent.index = 0\">\n" +
    "        <button class=\"btn btn-default dropdown-toggle\">\n" +
    "          Select opponent&nbsp;<span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "          <li ng-repeat=\"robot in robots\">\n" +
    "            <a ng-click=\"opponent.index = $index\">{{robot.name}}</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <button ng-click=\"runMatch($index, opponent.index)\"\n" +
    "              class=\"btn btn-primary\">Run match</button>\n" +
    "      <i ng-if=\"statusClasses\" ng-class=\"statusClasses\" class=\"fa\"></i>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div ng-if=\"history\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-12\">\n" +
    "        <rg-map board=\"history[match.turn].board\"\n" +
    "                click=\"chosenRobotIndex = index\"\n" +
    "                class=\"row\"></rg-map>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-12\">\n" +
    "        <input type=\"range\" ng-model=\"match.turn\"\n" +
    "               min=\"0\" max=\"{{history.length-1}}\" step=\"1\" value=\"0\"\n" +
    "               class=\"match-turn-slider\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-12\">\n" +
    "        <button ng-click=\"changeTurn(-1)\" class=\"btn btn-success\">\n" +
    "          <i class=\"glyphicon glyphicon-step-backward\"></i>\n" +
    "        </button>\n" +
    "        <button ng-click=\"changeTurn(1)\" class=\"btn btn-success\">\n" +
    "          <i class=\"glyphicon glyphicon-step-forward\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <span class=\"pull-right\">\n" +
    "          Turn: {{match.turn}}\n" +
    "          <span class=\"text-danger\">\n" +
    "            {{match.player1}}: {{history[match.turn].scores[0]}}\n" +
    "          </span>\n" +
    "          <span class=\"text-primary\">\n" +
    "            {{match.player2}}: {{history[match.turn].scores[1]}}\n" +
    "          </span>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"history[match.turn].board[chosenRobotIndex].log\"\n" +
    "         class=\"row\">\n" +
    "      <div class=\"col-xs-12\">\n" +
    "        <br/>\n" +
    "        Robot Log:\n" +
    "        <pre>{{history[match.turn].board[chosenRobotIndex].log}}</pre>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/client/src/app/robots/robots.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/robots.tpl.html",
    "<div ng-controller=\"RobotsCtrl\">\n" +
    "  <tabset ng-init=\"getRobots()\">\n" +
    "    <tab ng-repeat=\"robot in robots\"\n" +
    "         active=\"robot.active\"\n" +
    "         select=\"robot.init = true\">\n" +
    "      <tab-heading ng-switch=\"$first\">\n" +
    "        <div ng-switch-when=\"false\">\n" +
    "          {{robot.name}}\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "          <span class=\"glyphicon glyphicon-plus\"></span>&nbsp;New Robot\n" +
    "        </div>\n" +
    "      </tab-heading>\n" +
    "      <div class=\"row\">\n" +
    "\n" +
    "        <!-- left column with code mirror -->\n" +
    "        <div class=\"col-lg-8\">\n" +
    "          <div ng-include=\"'/client/src/app/robots/editor/editor.tpl.html'\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- right column with game map -->\n" +
    "        <div class=\"col-lg-4\">\n" +
    "          <div ng-include=\"'/client/src/app/robots/match/match.tpl.html'\"></div>\n" +
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
    "  <rg-box index=\"0\"></rg-box>\n" +
    "  <rg-box index=\"1\"></rg-box>\n" +
    "  <rg-box index=\"2\"></rg-box>\n" +
    "  <rg-box index=\"3\"></rg-box>\n" +
    "  <rg-box index=\"4\"></rg-box>\n" +
    "  <rg-box index=\"5\"></rg-box>\n" +
    "  <rg-box index=\"6\"></rg-box>\n" +
    "  <rg-box index=\"7\"></rg-box>\n" +
    "  <rg-box index=\"8\"></rg-box>\n" +
    "  <rg-box index=\"9\"></rg-box>\n" +
    "  <rg-box index=\"10\"></rg-box>\n" +
    "  <rg-box index=\"11\"></rg-box>\n" +
    "  <rg-box index=\"12\"></rg-box>\n" +
    "  <rg-box index=\"13\"></rg-box>\n" +
    "  <rg-box index=\"14\"></rg-box>\n" +
    "  <rg-box index=\"15\"></rg-box>\n" +
    "  <rg-box index=\"16\"></rg-box>\n" +
    "  <rg-box index=\"17\"></rg-box>\n" +
    "  <rg-box index=\"18\"></rg-box>\n" +
    "  <rg-box index=\"19\"></rg-box>\n" +
    "  <rg-box index=\"20\"></rg-box>\n" +
    "  <rg-box index=\"21\"></rg-box>\n" +
    "  <rg-box index=\"22\"></rg-box>\n" +
    "  <rg-box index=\"23\"></rg-box>\n" +
    "  <rg-box index=\"24\"></rg-box>\n" +
    "  <rg-box index=\"25\"></rg-box>\n" +
    "  <rg-box index=\"26\"></rg-box>\n" +
    "  <rg-box index=\"27\"></rg-box>\n" +
    "  <rg-box index=\"28\"></rg-box>\n" +
    "  <rg-box index=\"29\"></rg-box>\n" +
    "  <rg-box index=\"30\"></rg-box>\n" +
    "  <rg-box index=\"31\"></rg-box>\n" +
    "  <rg-box index=\"32\"></rg-box>\n" +
    "  <rg-box index=\"33\"></rg-box>\n" +
    "  <rg-box index=\"34\"></rg-box>\n" +
    "  <rg-box index=\"35\"></rg-box>\n" +
    "  <rg-box index=\"36\"></rg-box>\n" +
    "  <rg-box index=\"37\"></rg-box>\n" +
    "  <rg-box index=\"38\"></rg-box>\n" +
    "  <rg-box index=\"39\"></rg-box>\n" +
    "  <rg-box index=\"40\"></rg-box>\n" +
    "  <rg-box index=\"41\"></rg-box>\n" +
    "  <rg-box index=\"42\"></rg-box>\n" +
    "  <rg-box index=\"43\"></rg-box>\n" +
    "  <rg-box index=\"44\"></rg-box>\n" +
    "  <rg-box index=\"45\"></rg-box>\n" +
    "  <rg-box index=\"46\"></rg-box>\n" +
    "  <rg-box index=\"47\"></rg-box>\n" +
    "  <rg-box index=\"48\"></rg-box>\n" +
    "  <rg-box index=\"49\"></rg-box>\n" +
    "  <rg-box index=\"50\"></rg-box>\n" +
    "  <rg-box index=\"51\"></rg-box>\n" +
    "  <rg-box index=\"52\"></rg-box>\n" +
    "  <rg-box index=\"53\"></rg-box>\n" +
    "  <rg-box index=\"54\"></rg-box>\n" +
    "  <rg-box index=\"55\"></rg-box>\n" +
    "  <rg-box index=\"56\"></rg-box>\n" +
    "  <rg-box index=\"57\"></rg-box>\n" +
    "  <rg-box index=\"58\"></rg-box>\n" +
    "  <rg-box index=\"59\"></rg-box>\n" +
    "  <rg-box index=\"60\"></rg-box>\n" +
    "  <rg-box index=\"61\"></rg-box>\n" +
    "  <rg-box index=\"62\"></rg-box>\n" +
    "  <rg-box index=\"63\"></rg-box>\n" +
    "  <rg-box index=\"64\"></rg-box>\n" +
    "  <rg-box index=\"65\"></rg-box>\n" +
    "  <rg-box index=\"66\"></rg-box>\n" +
    "  <rg-box index=\"67\"></rg-box>\n" +
    "  <rg-box index=\"68\"></rg-box>\n" +
    "  <rg-box index=\"69\"></rg-box>\n" +
    "  <rg-box index=\"70\"></rg-box>\n" +
    "  <rg-box index=\"71\"></rg-box>\n" +
    "  <rg-box index=\"72\"></rg-box>\n" +
    "  <rg-box index=\"73\"></rg-box>\n" +
    "  <rg-box index=\"74\"></rg-box>\n" +
    "  <rg-box index=\"75\"></rg-box>\n" +
    "  <rg-box index=\"76\"></rg-box>\n" +
    "  <rg-box index=\"77\"></rg-box>\n" +
    "  <rg-box index=\"78\"></rg-box>\n" +
    "  <rg-box index=\"79\"></rg-box>\n" +
    "  <rg-box index=\"80\"></rg-box>\n" +
    "  <rg-box index=\"81\"></rg-box>\n" +
    "  <rg-box index=\"82\"></rg-box>\n" +
    "  <rg-box index=\"83\"></rg-box>\n" +
    "  <rg-box index=\"84\"></rg-box>\n" +
    "  <rg-box index=\"85\"></rg-box>\n" +
    "  <rg-box index=\"86\"></rg-box>\n" +
    "  <rg-box index=\"87\"></rg-box>\n" +
    "  <rg-box index=\"88\"></rg-box>\n" +
    "  <rg-box index=\"89\"></rg-box>\n" +
    "  <rg-box index=\"90\"></rg-box>\n" +
    "  <rg-box index=\"91\"></rg-box>\n" +
    "  <rg-box index=\"92\"></rg-box>\n" +
    "  <rg-box index=\"93\"></rg-box>\n" +
    "  <rg-box index=\"94\"></rg-box>\n" +
    "  <rg-box index=\"95\"></rg-box>\n" +
    "  <rg-box index=\"96\"></rg-box>\n" +
    "  <rg-box index=\"97\"></rg-box>\n" +
    "  <rg-box index=\"98\"></rg-box>\n" +
    "  <rg-box index=\"99\"></rg-box>\n" +
    "  <rg-box index=\"100\"></rg-box>\n" +
    "  <rg-box index=\"101\"></rg-box>\n" +
    "  <rg-box index=\"102\"></rg-box>\n" +
    "  <rg-box index=\"103\"></rg-box>\n" +
    "  <rg-box index=\"104\"></rg-box>\n" +
    "  <rg-box index=\"105\"></rg-box>\n" +
    "  <rg-box index=\"106\"></rg-box>\n" +
    "  <rg-box index=\"107\"></rg-box>\n" +
    "  <rg-box index=\"108\"></rg-box>\n" +
    "  <rg-box index=\"109\"></rg-box>\n" +
    "  <rg-box index=\"110\"></rg-box>\n" +
    "  <rg-box index=\"111\"></rg-box>\n" +
    "  <rg-box index=\"112\"></rg-box>\n" +
    "  <rg-box index=\"113\"></rg-box>\n" +
    "  <rg-box index=\"114\"></rg-box>\n" +
    "  <rg-box index=\"115\"></rg-box>\n" +
    "  <rg-box index=\"116\"></rg-box>\n" +
    "  <rg-box index=\"117\"></rg-box>\n" +
    "  <rg-box index=\"118\"></rg-box>\n" +
    "  <rg-box index=\"119\"></rg-box>\n" +
    "  <rg-box index=\"120\"></rg-box>\n" +
    "  <rg-box index=\"121\"></rg-box>\n" +
    "  <rg-box index=\"122\"></rg-box>\n" +
    "  <rg-box index=\"123\"></rg-box>\n" +
    "  <rg-box index=\"124\"></rg-box>\n" +
    "  <rg-box index=\"125\"></rg-box>\n" +
    "  <rg-box index=\"126\"></rg-box>\n" +
    "  <rg-box index=\"127\"></rg-box>\n" +
    "  <rg-box index=\"128\"></rg-box>\n" +
    "  <rg-box index=\"129\"></rg-box>\n" +
    "  <rg-box index=\"130\"></rg-box>\n" +
    "  <rg-box index=\"131\"></rg-box>\n" +
    "  <rg-box index=\"132\"></rg-box>\n" +
    "  <rg-box index=\"133\"></rg-box>\n" +
    "  <rg-box index=\"134\"></rg-box>\n" +
    "  <rg-box index=\"135\"></rg-box>\n" +
    "  <rg-box index=\"136\"></rg-box>\n" +
    "  <rg-box index=\"137\"></rg-box>\n" +
    "  <rg-box index=\"138\"></rg-box>\n" +
    "  <rg-box index=\"139\"></rg-box>\n" +
    "  <rg-box index=\"140\"></rg-box>\n" +
    "  <rg-box index=\"141\"></rg-box>\n" +
    "  <rg-box index=\"142\"></rg-box>\n" +
    "  <rg-box index=\"143\"></rg-box>\n" +
    "  <rg-box index=\"144\"></rg-box>\n" +
    "  <rg-box index=\"145\"></rg-box>\n" +
    "  <rg-box index=\"146\"></rg-box>\n" +
    "  <rg-box index=\"147\"></rg-box>\n" +
    "  <rg-box index=\"148\"></rg-box>\n" +
    "  <rg-box index=\"149\"></rg-box>\n" +
    "  <rg-box index=\"150\"></rg-box>\n" +
    "  <rg-box index=\"151\"></rg-box>\n" +
    "  <rg-box index=\"152\"></rg-box>\n" +
    "  <rg-box index=\"153\"></rg-box>\n" +
    "  <rg-box index=\"154\"></rg-box>\n" +
    "  <rg-box index=\"155\"></rg-box>\n" +
    "  <rg-box index=\"156\"></rg-box>\n" +
    "  <rg-box index=\"157\"></rg-box>\n" +
    "  <rg-box index=\"158\"></rg-box>\n" +
    "  <rg-box index=\"159\"></rg-box>\n" +
    "  <rg-box index=\"160\"></rg-box>\n" +
    "  <rg-box index=\"161\"></rg-box>\n" +
    "  <rg-box index=\"162\"></rg-box>\n" +
    "  <rg-box index=\"163\"></rg-box>\n" +
    "  <rg-box index=\"164\"></rg-box>\n" +
    "  <rg-box index=\"165\"></rg-box>\n" +
    "  <rg-box index=\"166\"></rg-box>\n" +
    "  <rg-box index=\"167\"></rg-box>\n" +
    "  <rg-box index=\"168\"></rg-box>\n" +
    "  <rg-box index=\"169\"></rg-box>\n" +
    "  <rg-box index=\"170\"></rg-box>\n" +
    "  <rg-box index=\"171\"></rg-box>\n" +
    "  <rg-box index=\"172\"></rg-box>\n" +
    "  <rg-box index=\"173\"></rg-box>\n" +
    "  <rg-box index=\"174\"></rg-box>\n" +
    "  <rg-box index=\"175\"></rg-box>\n" +
    "  <rg-box index=\"176\"></rg-box>\n" +
    "  <rg-box index=\"177\"></rg-box>\n" +
    "  <rg-box index=\"178\"></rg-box>\n" +
    "  <rg-box index=\"179\"></rg-box>\n" +
    "  <rg-box index=\"180\"></rg-box>\n" +
    "  <rg-box index=\"181\"></rg-box>\n" +
    "  <rg-box index=\"182\"></rg-box>\n" +
    "  <rg-box index=\"183\"></rg-box>\n" +
    "  <rg-box index=\"184\"></rg-box>\n" +
    "  <rg-box index=\"185\"></rg-box>\n" +
    "  <rg-box index=\"186\"></rg-box>\n" +
    "  <rg-box index=\"187\"></rg-box>\n" +
    "  <rg-box index=\"188\"></rg-box>\n" +
    "  <rg-box index=\"189\"></rg-box>\n" +
    "  <rg-box index=\"190\"></rg-box>\n" +
    "  <rg-box index=\"191\"></rg-box>\n" +
    "  <rg-box index=\"192\"></rg-box>\n" +
    "  <rg-box index=\"193\"></rg-box>\n" +
    "  <rg-box index=\"194\"></rg-box>\n" +
    "  <rg-box index=\"195\"></rg-box>\n" +
    "  <rg-box index=\"196\"></rg-box>\n" +
    "  <rg-box index=\"197\"></rg-box>\n" +
    "  <rg-box index=\"198\"></rg-box>\n" +
    "  <rg-box index=\"199\"></rg-box>\n" +
    "  <rg-box index=\"200\"></rg-box>\n" +
    "  <rg-box index=\"201\"></rg-box>\n" +
    "  <rg-box index=\"202\"></rg-box>\n" +
    "  <rg-box index=\"203\"></rg-box>\n" +
    "  <rg-box index=\"204\"></rg-box>\n" +
    "  <rg-box index=\"205\"></rg-box>\n" +
    "  <rg-box index=\"206\"></rg-box>\n" +
    "  <rg-box index=\"207\"></rg-box>\n" +
    "  <rg-box index=\"208\"></rg-box>\n" +
    "  <rg-box index=\"209\"></rg-box>\n" +
    "  <rg-box index=\"210\"></rg-box>\n" +
    "  <rg-box index=\"211\"></rg-box>\n" +
    "  <rg-box index=\"212\"></rg-box>\n" +
    "  <rg-box index=\"213\"></rg-box>\n" +
    "  <rg-box index=\"214\"></rg-box>\n" +
    "  <rg-box index=\"215\"></rg-box>\n" +
    "  <rg-box index=\"216\"></rg-box>\n" +
    "  <rg-box index=\"217\"></rg-box>\n" +
    "  <rg-box index=\"218\"></rg-box>\n" +
    "  <rg-box index=\"219\"></rg-box>\n" +
    "  <rg-box index=\"220\"></rg-box>\n" +
    "  <rg-box index=\"221\"></rg-box>\n" +
    "  <rg-box index=\"222\"></rg-box>\n" +
    "  <rg-box index=\"223\"></rg-box>\n" +
    "  <rg-box index=\"224\"></rg-box>\n" +
    "  <rg-box index=\"225\"></rg-box>\n" +
    "  <rg-box index=\"226\"></rg-box>\n" +
    "  <rg-box index=\"227\"></rg-box>\n" +
    "  <rg-box index=\"228\"></rg-box>\n" +
    "  <rg-box index=\"229\"></rg-box>\n" +
    "  <rg-box index=\"230\"></rg-box>\n" +
    "  <rg-box index=\"231\"></rg-box>\n" +
    "  <rg-box index=\"232\"></rg-box>\n" +
    "  <rg-box index=\"233\"></rg-box>\n" +
    "  <rg-box index=\"234\"></rg-box>\n" +
    "  <rg-box index=\"235\"></rg-box>\n" +
    "  <rg-box index=\"236\"></rg-box>\n" +
    "  <rg-box index=\"237\"></rg-box>\n" +
    "  <rg-box index=\"238\"></rg-box>\n" +
    "  <rg-box index=\"239\"></rg-box>\n" +
    "  <rg-box index=\"240\"></rg-box>\n" +
    "  <rg-box index=\"241\"></rg-box>\n" +
    "  <rg-box index=\"242\"></rg-box>\n" +
    "  <rg-box index=\"243\"></rg-box>\n" +
    "  <rg-box index=\"244\"></rg-box>\n" +
    "  <rg-box index=\"245\"></rg-box>\n" +
    "  <rg-box index=\"246\"></rg-box>\n" +
    "  <rg-box index=\"247\"></rg-box>\n" +
    "  <rg-box index=\"248\"></rg-box>\n" +
    "  <rg-box index=\"249\"></rg-box>\n" +
    "  <rg-box index=\"250\"></rg-box>\n" +
    "  <rg-box index=\"251\"></rg-box>\n" +
    "  <rg-box index=\"252\"></rg-box>\n" +
    "  <rg-box index=\"253\"></rg-box>\n" +
    "  <rg-box index=\"254\"></rg-box>\n" +
    "  <rg-box index=\"255\"></rg-box>\n" +
    "  <rg-box index=\"256\"></rg-box>\n" +
    "  <rg-box index=\"257\"></rg-box>\n" +
    "  <rg-box index=\"258\"></rg-box>\n" +
    "  <rg-box index=\"259\"></rg-box>\n" +
    "  <rg-box index=\"260\"></rg-box>\n" +
    "  <rg-box index=\"261\"></rg-box>\n" +
    "  <rg-box index=\"262\"></rg-box>\n" +
    "  <rg-box index=\"263\"></rg-box>\n" +
    "  <rg-box index=\"264\"></rg-box>\n" +
    "  <rg-box index=\"265\"></rg-box>\n" +
    "  <rg-box index=\"266\"></rg-box>\n" +
    "  <rg-box index=\"267\"></rg-box>\n" +
    "  <rg-box index=\"268\"></rg-box>\n" +
    "  <rg-box index=\"269\"></rg-box>\n" +
    "  <rg-box index=\"270\"></rg-box>\n" +
    "  <rg-box index=\"271\"></rg-box>\n" +
    "  <rg-box index=\"272\"></rg-box>\n" +
    "  <rg-box index=\"273\"></rg-box>\n" +
    "  <rg-box index=\"274\"></rg-box>\n" +
    "  <rg-box index=\"275\"></rg-box>\n" +
    "  <rg-box index=\"276\"></rg-box>\n" +
    "  <rg-box index=\"277\"></rg-box>\n" +
    "  <rg-box index=\"278\"></rg-box>\n" +
    "  <rg-box index=\"279\"></rg-box>\n" +
    "  <rg-box index=\"280\"></rg-box>\n" +
    "  <rg-box index=\"281\"></rg-box>\n" +
    "  <rg-box index=\"282\"></rg-box>\n" +
    "  <rg-box index=\"283\"></rg-box>\n" +
    "  <rg-box index=\"284\"></rg-box>\n" +
    "  <rg-box index=\"285\"></rg-box>\n" +
    "  <rg-box index=\"286\"></rg-box>\n" +
    "  <rg-box index=\"287\"></rg-box>\n" +
    "  <rg-box index=\"288\"></rg-box>\n" +
    "  <rg-box index=\"289\"></rg-box>\n" +
    "  <rg-box index=\"290\"></rg-box>\n" +
    "  <rg-box index=\"291\"></rg-box>\n" +
    "  <rg-box index=\"292\"></rg-box>\n" +
    "  <rg-box index=\"293\"></rg-box>\n" +
    "  <rg-box index=\"294\"></rg-box>\n" +
    "  <rg-box index=\"295\"></rg-box>\n" +
    "  <rg-box index=\"296\"></rg-box>\n" +
    "  <rg-box index=\"297\"></rg-box>\n" +
    "  <rg-box index=\"298\"></rg-box>\n" +
    "  <rg-box index=\"299\"></rg-box>\n" +
    "  <rg-box index=\"300\"></rg-box>\n" +
    "  <rg-box index=\"301\"></rg-box>\n" +
    "  <rg-box index=\"302\"></rg-box>\n" +
    "  <rg-box index=\"303\"></rg-box>\n" +
    "  <rg-box index=\"304\"></rg-box>\n" +
    "  <rg-box index=\"305\"></rg-box>\n" +
    "  <rg-box index=\"306\"></rg-box>\n" +
    "  <rg-box index=\"307\"></rg-box>\n" +
    "  <rg-box index=\"308\"></rg-box>\n" +
    "  <rg-box index=\"309\"></rg-box>\n" +
    "  <rg-box index=\"310\"></rg-box>\n" +
    "  <rg-box index=\"311\"></rg-box>\n" +
    "  <rg-box index=\"312\"></rg-box>\n" +
    "  <rg-box index=\"313\"></rg-box>\n" +
    "  <rg-box index=\"314\"></rg-box>\n" +
    "  <rg-box index=\"315\"></rg-box>\n" +
    "  <rg-box index=\"316\"></rg-box>\n" +
    "  <rg-box index=\"317\"></rg-box>\n" +
    "  <rg-box index=\"318\"></rg-box>\n" +
    "  <rg-box index=\"319\"></rg-box>\n" +
    "  <rg-box index=\"320\"></rg-box>\n" +
    "  <rg-box index=\"321\"></rg-box>\n" +
    "  <rg-box index=\"322\"></rg-box>\n" +
    "  <rg-box index=\"323\"></rg-box>\n" +
    "  <rg-box index=\"324\"></rg-box>\n" +
    "  <rg-box index=\"325\"></rg-box>\n" +
    "  <rg-box index=\"326\"></rg-box>\n" +
    "  <rg-box index=\"327\"></rg-box>\n" +
    "  <rg-box index=\"328\"></rg-box>\n" +
    "  <rg-box index=\"329\"></rg-box>\n" +
    "  <rg-box index=\"330\"></rg-box>\n" +
    "  <rg-box index=\"331\"></rg-box>\n" +
    "  <rg-box index=\"332\"></rg-box>\n" +
    "  <rg-box index=\"333\"></rg-box>\n" +
    "  <rg-box index=\"334\"></rg-box>\n" +
    "  <rg-box index=\"335\"></rg-box>\n" +
    "  <rg-box index=\"336\"></rg-box>\n" +
    "  <rg-box index=\"337\"></rg-box>\n" +
    "  <rg-box index=\"338\"></rg-box>\n" +
    "  <rg-box index=\"339\"></rg-box>\n" +
    "  <rg-box index=\"340\"></rg-box>\n" +
    "  <rg-box index=\"341\"></rg-box>\n" +
    "  <rg-box index=\"342\"></rg-box>\n" +
    "  <rg-box index=\"343\"></rg-box>\n" +
    "  <rg-box index=\"344\"></rg-box>\n" +
    "  <rg-box index=\"345\"></rg-box>\n" +
    "  <rg-box index=\"346\"></rg-box>\n" +
    "  <rg-box index=\"347\"></rg-box>\n" +
    "  <rg-box index=\"348\"></rg-box>\n" +
    "  <rg-box index=\"349\"></rg-box>\n" +
    "  <rg-box index=\"350\"></rg-box>\n" +
    "  <rg-box index=\"351\"></rg-box>\n" +
    "  <rg-box index=\"352\"></rg-box>\n" +
    "  <rg-box index=\"353\"></rg-box>\n" +
    "  <rg-box index=\"354\"></rg-box>\n" +
    "  <rg-box index=\"355\"></rg-box>\n" +
    "  <rg-box index=\"356\"></rg-box>\n" +
    "  <rg-box index=\"357\"></rg-box>\n" +
    "  <rg-box index=\"358\"></rg-box>\n" +
    "  <rg-box index=\"359\"></rg-box>\n" +
    "  <rg-box index=\"360\"></rg-box>\n" +
    "</div>\n" +
    "");
}]);
