var app;
(function (app) {
    var ui;
    (function (ui) {
        var PopUpService = (function () {
            function PopUpService($http) {
                var _this = this;
                this.$http = $http;
                this.showPopUp = function (params) {
                    if (_this.popUpExists()) {
                        _this.removePopUpElement();
                    }
                    _this.$http({ method: "GET", url: params.templateUrl }).then(function (results) {
                        var popUpElement = _this.createPopUpElement(results.data);
                        var dimension = _this.getDimensionOfPopUpElement(popUpElement);
                        _this.stylePopUp(popUpElement, dimension);
                        _this.appendPopUpElementToBody(popUpElement);
                        setTimeout(_this.removePopUpElement, params.visibilityTimeInMs);
                    });
                };
                this.computePosition = function (triggerElement, popUpElement) {
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
                this.removePopUpElement = function () {
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
                    _this.removePopUpElement();
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
                    document.getElementById("pop-up");
                };
            }
            return PopUpService;
        })();
        angular.module("app.ui").service("popUpService", ["$http", PopUpService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=popUp.service.js.map