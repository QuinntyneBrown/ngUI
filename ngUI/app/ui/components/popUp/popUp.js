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