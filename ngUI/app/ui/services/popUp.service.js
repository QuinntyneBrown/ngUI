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
                    var triggerElementRect = params.element.getBoundingClientRect();
                    if (_this.triggerElementRect && _this.triggerElementRect.top === triggerElementRect.top && _this.triggerElementRect.left === triggerElementRect.left) {
                        _this.destroy(false);
                        _this.triggerElementRect = null;
                        return;
                    }
                    else {
                        _this.destroy(true);
                    }
                    _this.triggerElementRect = triggerElementRect;
                    _this.transitionDurationInMilliseconds = params.transitionDurationInMilliseconds;
                    _this.setViewBag(params.viewBag);
                    _this.$http({ method: "GET", url: params.templateUrl }).then(function (results) {
                        var popUpElement = _this.createPopUpElement(results.data);
                        _this.$compile(popUpElement)(params.triggerScope);
                        setTimeout(function () {
                            _this.stylePopUp(popUpElement, false);
                            _this.positionPopUpElement(params.element, popUpElement, params.directionPriorityList);
                            _this.appendPopUpElementToBody(popUpElement);
                            setTimeout(function () {
                                popUpElement.style.opacity = "100";
                            }, 100);
                            setTimeout(function () {
                                _this.destroy(false);
                            }, params.visibilityTimeInMs);
                        }, 0);
                    });
                };
                this.positionPopUpElement = function (triggerElement, popUpElement, directionPriorityList) {
                    var popUpElementRect = _this.getDimensionOfPopUpElement(popUpElement);
                    var triggerElementRect = triggerElement.getBoundingClientRect();
                    for (var i = 0; i < directionPriorityList.length; i++) {
                        switch (directionPriorityList[i]) {
                            case "top":
                                if (triggerElementRect.top > popUpElementRect.height) {
                                    if (triggerElementRect.width > popUpElementRect.width) {
                                        popUpElement.style.top = (triggerElementRect.top - popUpElementRect.height) + "px";
                                        popUpElement.style.left = _this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                        return;
                                    }
                                    else {
                                        var diff = (popUpElementRect.width - triggerElementRect.width) / 2;
                                        if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                            popUpElement.style.top = (triggerElementRect.top - popUpElementRect.height) + "px";
                                            popUpElement.style.left = _this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                            return;
                                        }
                                    }
                                }
                                break;
                            case "left":
                                if (triggerElementRect.left > popUpElementRect.width) {
                                    if (triggerElementRect.height > popUpElementRect.height) {
                                        popUpElement.style.left = (triggerElementRect.left - popUpElementRect.width) + "px";
                                        popUpElement.style.top = _this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
                                        return;
                                    }
                                    else {
                                        var diff = (popUpElementRect.height - triggerElementRect.height) / 2;
                                        if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                            popUpElement.style.left = (triggerElementRect.left - popUpElementRect.width) + "px";
                                            popUpElement.style.top = _this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
                                            return;
                                        }
                                    }
                                }
                                break;
                            case "bottom":
                                if ((window.innerHeight - triggerElementRect.bottom) > popUpElementRect.height) {
                                    if (triggerElementRect.width > popUpElementRect.width) {
                                        popUpElement.style.top = triggerElementRect.bottom + "px";
                                        popUpElement.style.left = _this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                        return;
                                    }
                                    else {
                                        var diff = (popUpElementRect.width - triggerElementRect.width) / 2;
                                        if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                            popUpElement.style.top = triggerElementRect.bottom + "px";
                                            popUpElement.style.left = _this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                            return;
                                        }
                                    }
                                }
                                break;
                            case "right":
                                if ((window.innerWidth - triggerElementRect.right) > popUpElementRect.width) {
                                    if (triggerElementRect.height > popUpElementRect.height) {
                                        popUpElement.style.left = triggerElementRect.right + "px";
                                        popUpElement.style.top = _this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
                                        return;
                                    }
                                    else {
                                        var diff = (popUpElementRect.height - triggerElementRect.height) / 2;
                                        if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                            popUpElement.style.left = triggerElementRect.right + "px";
                                            popUpElement.style.top = _this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
                                            return;
                                        }
                                    }
                                }
                                break;
                        }
                    }
                    throw new Error("Unable to position place pop up.");
                };
                this.appendPopUpElementToBody = function (popUpElement) {
                    document.body.appendChild(popUpElement);
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
                    if (!force) {
                        var popUpElement = document.getElementById("pop-up");
                        setTimeout(function () {
                            popUpElement.style.opacity = "0";
                        }, 0);
                        _this.triggerElementRect = null;
                        setTimeout(function () {
                            if (popUpElement) {
                                try {
                                    var parentNode = popUpElement.parentNode;
                                    parentNode.removeChild(popUpElement);
                                }
                                catch (error) {
                                }
                            }
                        }, _this.transitionDurationInMilliseconds);
                    }
                    else {
                        var popUpElement = document.getElementById("pop-up");
                        if (popUpElement) {
                            try {
                                var parentNode = popUpElement.parentNode;
                                parentNode.removeChild(popUpElement);
                            }
                            catch (error) {
                            }
                        }
                    }
                };
                this.getDimensionOfPopUpElement = function (popUpElement) {
                    _this.stylePopUp(popUpElement, true);
                    _this.appendPopUpElementToBody(popUpElement);
                    var boundingRect = popUpElement.getBoundingClientRect();
                    _this.destroy(true);
                    return boundingRect;
                };
                this.stylePopUp = function (popUpElement, hidden) {
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
                this.getVerticalMiddle = function (element) {
                    var clientRect = element.getBoundingClientRect();
                    return ((clientRect.bottom - clientRect.top) / 2) + clientRect.top;
                };
                this.getHorizontalMiddle = function (element) {
                    var clientRect = element.getBoundingClientRect();
                    return ((clientRect.right - clientRect.left) / 2) + clientRect.left;
                };
            }
            return PopUpService;
        })();
        angular.module("app.ui").service("popUpService", ["$http", "$compile", PopUpService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=popUp.service.js.map