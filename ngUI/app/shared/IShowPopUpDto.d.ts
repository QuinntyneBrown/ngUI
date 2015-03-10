declare module app {
    
    interface IShowPopUpDto extends IPopUpTriggerScope {

        element: HTMLDivElement;

        triggerScope: ng.IScope;
    }
} 