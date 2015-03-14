declare module app {
    
    interface IPopUpTrigger extends ng.IDirective {
        
        showPopUp(scope: IPopUpTriggerScope, element: ng.IAugmentedJQuery):void;
    }
    
}