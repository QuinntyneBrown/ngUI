declare module app {
    
    interface IShowPopUpOptions  {

        element: HTMLElement;

        triggerScope: IPopUpTriggerScope;

        templateUrl: string;

        directionPriorityList: string[];

        visibilityDurationInMilliseconds: number;

        viewBag: any;

        transitionDurationInMilliseconds: number;
    }
} 