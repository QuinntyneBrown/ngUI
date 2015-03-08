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