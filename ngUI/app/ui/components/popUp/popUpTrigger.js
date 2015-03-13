var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var PopUpTrigger = (function () {
            function PopUpTrigger(popUp) {
                var _this = this;
                this.popUp = popUp;
                this.restrict = "A";
                this.scope = {
                    directionPriorityList: "=",
                    templateUrl: "@",
                    transitionDurationInMilliseconds: '@',
                    triggerEvent: "@",
                    viewBag: "=",
                    visibilityDurationInMilliseconds: "="
                };
                this.link = function (scope, element, attributes) {
                    element[0].addEventListener(scope.triggerEvent, function () {
                        _this.popUp.showPopUp({
                            directionPriorityList: scope.directionPriorityList,
                            element: document.getElementById("step-1"),
                            templateUrl: scope.templateUrl,
                            transitionDurationInMilliseconds: scope.transitionDurationInMilliseconds,
                            triggerScope: scope,
                            visibilityDurationInMilliseconds: scope.visibilityDurationInMilliseconds,
                            viewBag: scope.viewBag,
                        }).then(function () {
                            _this.popUp.showPopUp({
                                directionPriorityList: scope.directionPriorityList,
                                element: document.getElementById("step-2"),
                                templateUrl: scope.templateUrl,
                                transitionDurationInMilliseconds: scope.transitionDurationInMilliseconds,
                                triggerScope: scope,
                                visibilityDurationInMilliseconds: scope.visibilityDurationInMilliseconds,
                                viewBag: scope.viewBag,
                            });
                        });
                    });
                };
            }
            return PopUpTrigger;
        })();
        angular.module("app.ui").directive("popUpTrigger", ["popUp", function (popUp) { return new PopUpTrigger(popUp); }]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=popUpTrigger.js.map