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