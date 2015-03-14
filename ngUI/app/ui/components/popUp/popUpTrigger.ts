module app.ui {

    "use strict";

    class PopUpTrigger implements IPopUpTrigger {
        
        constructor(private popUp: IPopUp) {
            this.link = this._link.bind(this);
        }

        static instance(popUp: IPopUp): IPopUpTrigger {
            return new PopUpTrigger(popUp);
        }

        public restrict: string = "A";

        public scope = {            
            directionPriorityList: "=",
            templateUrl: "@",
            transitionDurationInMilliseconds: '@',
            triggerEvent: "@",
            viewBag: "=",
            visibilityDurationInMilliseconds: "=",
            alignment: "@",
            margin:"@"            
        };

        public link: (scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => void;

        public _link = (scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

            scope.popUpTrigger = this;

            element[0].addEventListener(scope.triggerEvent,() => {
                scope.popUpTrigger.showPopUp(scope, element);
            });
        }

        public showPopUp = (scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery) => {
            this.popUp.showPopUp({
                directionPriorityList: scope.directionPriorityList,
                element: element[0],
                templateUrl: scope.templateUrl,
                transitionDurationInMilliseconds: scope.transitionDurationInMilliseconds,
                triggerScope: scope,
                visibilityDurationInMilliseconds: scope.visibilityDurationInMilliseconds,
                viewBag: scope.viewBag,
                alignment: scope.alignment,
                margin: scope.margin
            });
        }
    }

    angular.module("app.ui").directive("popUpTrigger", ["popUp",PopUpTrigger.instance]);

}
