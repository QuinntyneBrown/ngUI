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