declare module app {
    
    interface IPopUpTriggerScope extends ng.IScope {

        templateUrl: string;

        triggerEvent: string;

        directionPriorityList: string[];

        visibilityDurationInMilliseconds: number;

        viewBag: any;

        transitionDurationInMilliseconds: number;

        popUpTrigger: any;

        alignment: string;

        margin: string;
    }

} 