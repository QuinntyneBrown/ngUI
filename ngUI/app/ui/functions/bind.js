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