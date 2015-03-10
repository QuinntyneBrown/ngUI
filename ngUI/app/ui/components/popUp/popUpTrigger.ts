module app.ui {

    "use strict";

    class PopUpTrigger {

        constructor(private popUpService) {

        }

        public restrict: string = "A";

        public scope = {
            visibilityDurationInMilliseconds: "=",
            directionPriorityList: "=",
            templateUrl:"@",
            triggerEvent: "@",
            viewBag: "=",
            transitionDurationInMilliseconds:'@'
        };

        public link = (scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

            element[0].addEventListener(scope.triggerEvent,() => {
                this.popUpService.showPopUp({
                    templateUrl: scope.templateUrl,
                    element: element[0],
                    directionPriorityList: scope.directionPriorityList,
                    visibilityDurationInMilliseconds: scope.visibilityDurationInMilliseconds,
                    viewBag: scope.viewBag,
                    transitionDurationInMilliseconds: scope.transitionDurationInMilliseconds,
                    triggerScope: scope
                });
            });

        }

    }

    angular.module("app.ui").directive("popUpTrigger", ["popUpService", (popUpService) => new PopUpTrigger(popUpService)]);

}
