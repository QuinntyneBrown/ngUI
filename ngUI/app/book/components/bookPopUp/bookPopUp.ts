module app.book {

    "use strict";

    class BookPopUp {

        constructor() {

        }

        public restrict: string = "E";

        public replace: boolean = true;

		public scope = {};

        public templateUrl: string = "/app/book/components/bookPopUp/bookPopUp.html";

        public link = (scope, element, attributes) => {


        }

    }

    angular.module("app.book").directive("bookPopUp",[() => new BookPopUp()]);

}
