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