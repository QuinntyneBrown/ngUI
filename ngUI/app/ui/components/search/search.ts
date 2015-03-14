module app.ui {

    "use strict";

    class Search {

        constructor() {

        }

        public restrict: string = "E";

        public replace: boolean = true;

		public scope = {};

        public templateUrl: string = "/app/ui/components/search/search.html";

        public link = (scope, element, attributes) => {


        }

    }

    angular.module("app.ui").directive("search",[() => new Search()]);

}
