angular.module('templates-main', ['/client/src/app/robots/robots.tpl.html']);

angular.module("/client/src/app/robots/robots.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/client/src/app/robots/robots.tpl.html",
    "");
}]);
