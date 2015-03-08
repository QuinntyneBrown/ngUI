module app.ui {

    "use strict";

    class PopUpTrigger {

        constructor(private popUpService) {

        }

        public restrict: string = "A";

        public scope = {
            visibilityTimeInMs: "=",
            directionPriorityList: "=",
            templateUrl:"@",
            triggerEvent: "@",
            viewBag:"="
        };

        public link = (scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

            element[0].addEventListener(scope.triggerEvent,() => {
                this.popUpService.showPopUp({
                    templateUrl: scope.templateUrl,
                    element: element[0],
                    directionPriorityList: scope.directionPriorityList,
                    visibilityTimeInMs: scope.visibilityTimeInMs,
                    viewBag:scope.viewBag
                });
            });

        }

    }

    angular.module("app.ui").directive("popUpTrigger", ["popUpService", (popUpService) => new PopUpTrigger(popUpService)]);

}
