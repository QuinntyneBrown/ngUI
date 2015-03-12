module app.ui {

    "use strict";

    class PopUpTrigger implements ng.IDirective {

        constructor(private popUp: IPopUp) {

        }

        public restrict: string = "A";

        public scope = {            
            directionPriorityList: "=",
            templateUrl: "@",
            transitionDurationInMilliseconds: '@',
            triggerEvent: "@",
            viewBag: "=",
            visibilityDurationInMilliseconds: "="            
        };

        public link = (scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

            element[0].addEventListener(scope.triggerEvent,() => {
                this.popUp.showPopUp({
                    directionPriorityList: scope.directionPriorityList,
                    element: element[0],
                    templateUrl: scope.templateUrl,
                    transitionDurationInMilliseconds: scope.transitionDurationInMilliseconds,
                    triggerScope: scope,
                    visibilityDurationInMilliseconds: scope.visibilityDurationInMilliseconds,
                    viewBag: scope.viewBag,
                });
            });
        }

    }

    angular.module("app.ui").directive("popUpTrigger", ["popUp", (popUp) => new PopUpTrigger(popUp)]);

}
