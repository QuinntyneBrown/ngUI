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
            function BookPopUpController(popUp) {
                this.popUp = popUp;
                var viewBag = popUp.viewBag;
                this.title = viewBag.title;
            }
            return BookPopUpController;
        })();
        angular.module("app.book").controller("bookPopUpController", ["popUp", BookPopUpController]);
    })(book = app.book || (app.book = {}));
})(app || (app = {}));
//# sourceMappingURL=bookPopUp.controller.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui", [
            "ngAnimate",
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
        var AutoComplete = (function () {
            function AutoComplete() {
                this.restrict = "A";
                this.replace = true;
                this.scope = {};
                this.templateUrl = "/app/ui/components/autoComplete/autoComplete.html";
                this.link = function (scope, element, attributes) {
                    element[0];
                };
            }
            return AutoComplete;
        })();
        angular.module("app.ui").directive("autoComplete", [function () { return new AutoComplete(); }]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=autoComplete.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        var PopUp = (function () {
            function PopUp($compile, $http, $q, $timeout, clientRectEquals, getBoundingRectForDetachedElement, positionDetachedElement) {
                var _this = this;
                this.$compile = $compile;
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.clientRectEquals = clientRectEquals;
                this.getBoundingRectForDetachedElement = getBoundingRectForDetachedElement;
                this.positionDetachedElement = positionDetachedElement;
                this.showPopUp = function (popUpOptions) {
                    var deferred = _this.$q.defer();
                    _this.$timeout.cancel(_this.timeoutPromise);
                    if (_this.clientRectEquals(_this.triggerElementRect, popUpOptions.element.getBoundingClientRect())) {
                        _this.triggerElementRect = null;
                        _this.hideAsync().then(function () {
                            _this.destroy(true);
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                    else {
                        _this.destroy(true);
                    }
                    _this.initialize(popUpOptions);
                    _this.fetchAndSetTemplateAsync(popUpOptions.templateUrl).then(function () {
                        var popUpElement = _this.createPopUpElement(_this.htmlTemplate);
                        _this.$compile(popUpElement)(popUpOptions.triggerScope);
                        _this.$timeout(function () {
                            _this.stylePopUp(popUpElement);
                            _this.positionDetachedElement(popUpOptions.element, popUpElement, popUpOptions.directionPriorityList, _this.getBoundingRectForDetachedElement(popUpElement));
                            document.body.appendChild(popUpElement);
                            _this.$timeout(function () {
                                popUpElement.style.opacity = "100";
                                _this.hideElementAsync(popUpElement, popUpOptions.visibilityDurationInMilliseconds).then(function (results) {
                                }).then(function () {
                                    deferred.resolve();
                                });
                            }, 100);
                            // hide elemenet after visibility duration
                            // resolve promise
                        }, 0);
                    });
                    return deferred.promise;
                };
                this.initialize = function (popUpOptions) {
                    _this.triggerElement = popUpOptions.element;
                    _this.triggerScope = popUpOptions.triggerScope;
                    _this.visibilityDurationInMilliseconds = popUpOptions.visibilityDurationInMilliseconds;
                    _this.triggerElementRect = popUpOptions.element.getBoundingClientRect();
                    _this.transitionDurationInMilliseconds = popUpOptions.transitionDurationInMilliseconds;
                    _this.viewBag = popUpOptions.viewBag;
                };
                this.fetchAndSetTemplateAsync = function (templateUrl) {
                    return _this.$http({ method: "GET", url: templateUrl }).then(function (results) {
                        _this.htmlTemplate = results.data;
                    });
                };
                this.hideElementAsync = function (element, visibilityDurationInMilliseconds) {
                    var deferred = _this.$q.defer();
                    _this.timeoutPromise = _this.$timeout(function () {
                        _this.destroy(false).then(function () {
                            deferred.resolve();
                        });
                    }, visibilityDurationInMilliseconds);
                    return deferred.promise;
                };
                this.createPopUpElement = function (template) {
                    var popUpElement = document.createElement("div");
                    popUpElement.id = "pop-up";
                    var arrowElement = document.createElement("div");
                    popUpElement.appendChild(arrowElement);
                    var innerElement = document.createElement("div");
                    innerElement.setAttribute("class", "inner");
                    innerElement.innerHTML = template;
                    popUpElement.appendChild(innerElement);
                    return popUpElement;
                };
                this.destroy = function (force) {
                    var deferred = _this.$q.defer();
                    var popUpElement = document.getElementById("pop-up");
                    if (!force) {
                        _this.$timeout(function () {
                            popUpElement.style.opacity = "0";
                        }, 0).then(function () {
                            _this.triggerElementRect = null;
                            _this.$timeout(function () {
                                if (popUpElement) {
                                    try {
                                        popUpElement.parentNode.removeChild(popUpElement);
                                    }
                                    catch (error) {
                                        console.log("error - 1");
                                    }
                                }
                            }, _this.transitionDurationInMilliseconds).then(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }
                    else {
                        if (popUpElement) {
                            try {
                                popUpElement.parentNode.removeChild(popUpElement);
                            }
                            catch (error) {
                                console.log("error");
                            }
                        }
                    }
                };
                this.setOpacityToZeroAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.$timeout(function () {
                        _this.popUpElement.style.opacity = "0";
                        deferred.resolve();
                    }, 0);
                    return deferred.promise;
                };
                this.waitForTransitionAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.$timeout(function () {
                        deferred.resolve();
                    }, _this.transitionDurationInMilliseconds);
                    return deferred.promise;
                };
                this.hideAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.setOpacityToZeroAsync().then(_this.waitForTransitionAsync).then(function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.stylePopUp = function (popUpElement) {
                    popUpElement.setAttribute("class", "pop-up");
                    popUpElement.setAttribute("style", "-webkit-transition: opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out;-o-transition: opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out;transition: opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out;");
                    popUpElement.style.opacity = "0";
                    popUpElement.style.position = "absolute";
                    popUpElement.style.display = "block";
                    var innerElement = popUpElement.querySelector(".inner");
                    innerElement.setAttribute("style", "-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border-radius:5px;");
                    innerElement.style.margin = "5px";
                    innerElement.style.border = "1px solid #cccccc";
                    innerElement.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
                };
            }
            PopUp.prototype.processResponse = function (results) {
                var deferred = this.$q.defer();
                this.createPopUpElement(results.data);
                this.$compile(this.popUpElement)(this.triggerScope);
                deferred.resolve();
                return deferred.promise;
            };
            return PopUp;
        })();
        angular.module("app.ui").service("popUp", [
            "$compile",
            "$http",
            "$q",
            "$timeout",
            "clientRectEquals",
            "getBoundingRectForDetachedElement",
            "positionDetachedElement",
            PopUp
        ]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=popUp.js.map
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
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("bind", function (element, o) {
            if (element) {
                for (var event in o) {
                    var callback = o[event];
                    event.split(/\s+/).forEach(function (event) {
                        element.addEventListener(event, callback);
                    });
                }
            }
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=bind.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("clientRectEquals", function (clientRectA, clientRectB) {
            if (!clientRectA || !clientRectB) {
                return false;
            }
            return (clientRectA.top === clientRectB.top && clientRectA.left === clientRectB.left && clientRectA.bottom === clientRectB.bottom && clientRectA.right === clientRectB.right);
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=clientRectEquals.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("fire", function (target, type, properties) {
            var htmlEvent = document.createEvent("HTMLEvents");
            htmlEvent.initEvent(type, true, true);
            for (var j in properties) {
                htmlEvent[j] = properties[j];
            }
            target.dispatchEvent(htmlEvent);
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=fire.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("getBoundingRectForDetachedElement", function (detachedElement) {
            var clientRect;
            detachedElement.style.visibility = 'none';
            document.body.appendChild(detachedElement);
            clientRect = detachedElement.getBoundingClientRect();
            detachedElement.parentNode.removeChild(detachedElement);
            return clientRect;
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=getBoundingRectForDetachedElement.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("positionDetachedElement", function (triggerElement, element, directionPriorityList, elementRect) {
            var triggerElementRect = triggerElement.getBoundingClientRect();
            var triggerElementVerticalMiddle = ((triggerElementRect.bottom - triggerElementRect.top) / 2) + triggerElementRect.top;
            var triggerElementHorizontalMiddle = ((triggerElementRect.right - triggerElementRect.left) / 2) + triggerElementRect.left;
            for (var i = 0; i < directionPriorityList.length; i++) {
                var lastOption = directionPriorityList.length == i + 1;
                switch (directionPriorityList[i]) {
                    case "top":
                        if (triggerElementRect.top > elementRect.height || lastOption) {
                            if (triggerElementRect.width > elementRect.width || lastOption) {
                                element.style.top = (triggerElementRect.top - elementRect.height) + "px";
                                element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.width - triggerElementRect.width) / 2;
                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    element.style.top = (triggerElementRect.top - elementRect.height) + "px";
                                    element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                    case "left":
                        if (triggerElementRect.left > elementRect.width || lastOption) {
                            if (triggerElementRect.height > elementRect.height || lastOption) {
                                element.style.left = (triggerElementRect.left - elementRect.width) + "px";
                                element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.height - triggerElementRect.height) / 2;
                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    element.style.left = (triggerElementRect.left - elementRect.width) + "px";
                                    element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                    case "bottom":
                        if (((window.innerHeight - triggerElementRect.bottom) > elementRect.height) || lastOption) {
                            if (triggerElementRect.width > elementRect.width || lastOption) {
                                element.style.top = triggerElementRect.bottom + "px";
                                element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.width - triggerElementRect.width) / 2;
                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    element.style.top = triggerElementRect.bottom + "px";
                                    element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                    case "right":
                        if (((window.innerWidth - triggerElementRect.right) > elementRect.width) || lastOption) {
                            if (triggerElementRect.height > elementRect.height || lastOption) {
                                element.style.left = triggerElementRect.right + "px";
                                element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.height - triggerElementRect.height) / 2;
                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    element.style.left = triggerElementRect.right + "px";
                                    element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                }
            }
            throw new Error("Unable to position place pop up.");
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=positionDetachedElement.js.map
