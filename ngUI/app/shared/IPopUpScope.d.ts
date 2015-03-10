declare module app {
    
    interface IPopUpTriggerScope {

        templateUrl: string;

        triggerEvent: string;

        directionPriorityList: string[];

        visibilityTimeInMs: number;

        viewBag: any;

        transitionDurationInMilliseconds:string;
    }

} 