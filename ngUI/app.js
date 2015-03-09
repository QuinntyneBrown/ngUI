var app;
(function (app) {
    var book;
    (function (book) {
        angular.module("app.book", [
            "app.ui",
            "ngRoute"
        ]).config(["$routeProvider", config]);
        function config($routeProvider) {
            //$routeProvider.otherwise("/");
        }
    })(book = app.book || (app.book = {}));
})(app || (app = {}));
//# sourceMappingURL=module.js.map
var app;
(function (app) {
    var book;
    (function (book) {
        var BookPopUpController = (function () {
            function BookPopUpController(popUpService) {
                this.popUpService = popUpService;
                var viewBag = popUpService.getViewBag();
                this.title = viewBag.title;
            }
            return BookPopUpController;
        })();
        angular.module("app.book").controller("bookPopUpController", ["popUpService", BookPopUpController]);
    })(book = app.book || (app.book = {}));
})(app || (app = {}));
//# sourceMappingURL=bookPopUp.controller.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui", [
            "ngRoute"
        ]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=ui.module.js.map
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
                    viewBag: "="
                };
                this.link = function (scope, element, attributes) {
                    element[0].addEventListener(scope.triggerEvent, function () {
                        _this.popUpService.showPopUp({
                            templateUrl: scope.templateUrl,
                            element: element[0],
                            directionPriorityList: scope.directionPriorityList,
                            visibilityTimeInMs: scope.visibilityTimeInMs,
                            viewBag: scope.viewBag,
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
var app;
(function (app) {
    var ui;
    (function (ui) {
        var PopUpService = (function () {
            function PopUpService($http, $compile) {
                var _this = this;
                this.$http = $http;
                this.$compile = $compile;
                this.setViewBag = function (data) {
                    _this.viewBag = data;
                };
                this.getViewBag = function () {
                    return _this.viewBag;
                };
                this.showPopUp = function (params) {
                    if (_this.popUpExists()) {
                        _this.destroy();
                    }
                    _this.setViewBag(params.viewBag);
                    _this.$http({ method: "GET", url: params.templateUrl }).then(function (results) {
                        var popUpElement = _this.createPopUpElement(results.data);
                        _this.$compile(popUpElement)(params.triggerScope);
                        setTimeout(function () {
                            var dimension = _this.getDimensionOfPopUpElement(popUpElement);
                            _this.stylePopUp(popUpElement, dimension);
                            _this.appendPopUpElementToBody(popUpElement);
                            setTimeout(_this.destroy, params.visibilityTimeInMs);
                        }, 0);
                    });
                };
                this.computePosition = function (triggerElement, popUpElement, directionPriorityList) {
                    var popUpElementRect = _this.getDimensionOfPopUpElement(popUpElement);
                    for (var i = 0; i++; i < directionPriorityList.length) {
                        switch (directionPriorityList[i]) {
                            case "top":
                            case "left":
                            case "bottom":
                            case "right":
                        }
                    }
                };
                this.appendPopUpElementToBody = function (popUpElement) {
                    document.body.appendChild(popUpElement);
                };
                this.createPopUpElement = function (template) {
                    var div = document.createElement("popup");
                    div.id = "pop-up";
                    div.innerHTML = template;
                    return div;
                };
                this.destroy = function () {
                    var popUpElement = document.getElementById("pop-up");
                    if (popUpElement) {
                        try {
                            var parentNode = popUpElement.parentNode;
                            parentNode.removeChild(popUpElement);
                        }
                        catch (error) {
                        }
                    }
                };
                this.getDimensionOfPopUpElement = function (popUpElement) {
                    _this.stylePopUpAsHidden(popUpElement);
                    _this.appendPopUpElementToBody(popUpElement);
                    var boundingRect = popUpElement.getBoundingClientRect();
                    _this.destroy();
                    return boundingRect;
                };
                this.stylePopUp = function (popUpElement, dimensions) {
                    popUpElement.setAttribute("class", "pop-up");
                    popUpElement.setAttribute("style", "position:absolute;display:block;");
                };
                this.stylePopUpAsHidden = function (popUpElement) {
                    popUpElement.setAttribute("class", "pop-up");
                    popUpElement.setAttribute("style", "position:absolute;display:block;opacity:0;");
                };
                this.popUpExists = function () {
                    return document.getElementById("pop-up") != null;
                };
                this.getPopUpElement = function () {
                    return document.getElementById("pop-up");
                };
                this.getRemainingWindowSpace = function (direction, target) {
                    var rect = target.getBoundingClientRect();
                    switch (direction) {
                        case "top":
                            return rect.top;
                        case "bottom":
                            return screen.availHeight - rect.bottom;
                        case "left":
                            return rect.left;
                        case "right":
                            return screen.availWidth - rect.right;
                    }
                    return 0;
                };
            }
            return PopUpService;
        })();
        angular.module("app.ui").service("popUpService", ["$http", "$compile", PopUpService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=popUp.service.js.map
