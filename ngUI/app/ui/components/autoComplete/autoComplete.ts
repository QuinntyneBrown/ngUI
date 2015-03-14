module app.ui {

    "use strict";

    class AutoComplete {

        constructor() {

        }

        public restrict: string = "A";

        public replace: boolean = true;

		public scope = {};

        public templateUrl: string = "/app/ui/components/autoComplete/autoComplete.html";

        public link = (scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

            this.element = element[0];
        }

        public element:HTMLElement;
    }

    angular.module("app.ui").directive("autoComplete",[() => new AutoComplete()]);

}
