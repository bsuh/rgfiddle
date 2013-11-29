angular.module('templates-main', ['/client/src/app/robots/robots.tpl.html']);

angular.module("/client/src/app/robots/robots.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/robots.tpl.html",
    "<script type=\"text/ng-template\" id=\"/client/vendor/src/app/robots/codemirror.tpl.html\">\n" +
    "  <textarea ui-codemirror=\"codeMirrorOptions(robot.code)\" ng-model=\"robot.code\"></textarea>\n" +
    "</script>\n" +
    "\n" +
    "<div ng-controller=\"RobotsCtrl\">\n" +
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
    "      <div class=\"editor\">\n" +
    "        <form class=\"form-inline\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <input type=\"text\" ng-model=\"robot.name\"\n" +
    "                   id=\"newRobotNameInput\" class=\"form-control\" />\n" +
    "          </div>\n" +
    "          <button type=\"submit\" ng-click=\"updateRobot($index)\"\n" +
    "                  class=\"btn btn-default\">Save</button>\n" +
    "          <button type=\"submit\" ng-if=\"!$first\" ng-click=\"updateRobot($index, true)\"\n" +
    "                  class=\"btn btn-danger\">Delete</button>\n" +
    "        </form>\n" +
    "        <div ng-if=\"robot.active\"\n" +
    "             ng-include=\"'/client/vendor/src/app/robots/codemirror.tpl.html'\"></div>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n" +
    "");
}]);
