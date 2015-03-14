declare module app {
    
    interface IPopUpOptions  {

        alignment: string;

        element: HTMLElement;

        triggerScope: IPopUpTriggerScope;

        templateUrl: string;

        directionPriorityList: string[];

        visibilityDurationInMilliseconds: number;

        viewBag: any;

        transitionDurationInMilliseconds: number;

        margin: string;
    }
} 