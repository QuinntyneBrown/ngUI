var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var PopUpTrigger = (function () {
            function PopUpTrigger(popUpService) {
                var _this = this;
                this.popUpService = popUpService;
                this.restrict = "A";
                this.scope = {
                    visibilityTimeInMs: "=",
                    directionPriorityList: "=",
                    templateUrl: "@",
                    triggerEvent: "@",
                    viewBag: "=",
                    transitionDurationInMilliseconds: '@'
                };
                this.link = function (scope, element, attributes) {
                    element[0].addEventListener(scope.triggerEvent, function () {
                        _this.popUpService.showPopUp({
                            templateUrl: scope.templateUrl,
                            element: element[0],
                            directionPriorityList: scope.directionPriorityList,
                            visibilityTimeInMs: scope.visibilityTimeInMs,
                            viewBag: scope.viewBag,
                            transitionDurationInMilliseconds: scope.transitionDurationInMilliseconds,
                            triggerScope: scope
                        });
                    });
                };
            }
            return PopUpTrigger;
        })();
        angular.module("app.ui").directive("popUpTrigger", ["popUpService", function (popUpService) { return new PopUpTrigger(popUpService); }]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=popUpTrigger.js.map