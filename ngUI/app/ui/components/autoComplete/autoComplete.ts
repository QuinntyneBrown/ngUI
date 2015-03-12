module app.ui {

    "use strict";

    class AutoComplete {

        constructor() {

        }

        public restrict: string = "A";

        public replace: boolean = true;

		public scope = {};

        public templateUrl: string = "/app/ui/components/autoComplete/autoComplete.html";

        public link = (scope, element, attributes) => {

            element[0]
        }

    }

    angular.module("app.ui").directive("autoComplete",[() => new AutoComplete()]);

}
