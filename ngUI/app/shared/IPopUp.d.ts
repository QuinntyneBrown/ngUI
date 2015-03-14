declare module app {
    
    interface IPopUp {

        viewBag: any;

        showPopUp: (params: IPopUpOptions) => any;

        dismiss:() => ng.IPromise<any>;
    }
} 