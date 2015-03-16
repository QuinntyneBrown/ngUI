declare module app {
    
    interface IPopUpOptions  {

        alignment: string;

        directionPriorityList: string[];

        displayArrow: boolean;

        element: HTMLElement;

        margin: string;

        templateUrl: string;

        triggerScope: IPopUpTriggerScope;

        transitionDurationInMilliseconds: number;

        viewBag: any;

        visibilityDurationInMilliseconds: number;  
    }
} 