declare module app {
    
    interface IPopUpTriggerScope {

        templateUrl: string;

        triggerEvent: string;

        directionPriorityList: string[];

        visibilityDurationInMilliseconds: number;

        viewBag: any;

        transitionDurationInMilliseconds:number;
    }

} 