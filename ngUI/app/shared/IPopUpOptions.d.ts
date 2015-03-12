declare module app {
    
    interface IPopUpOptions  {

        element: HTMLElement;

        triggerScope: IPopUpTriggerScope;

        templateUrl: string;

        directionPriorityList: string[];

        visibilityDurationInMilliseconds: number;

        viewBag: any;

        transitionDurationInMilliseconds: number;
    }
} 