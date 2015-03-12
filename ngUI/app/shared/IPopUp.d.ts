declare module app {
    
    interface IPopUp {

        viewBag: any;

        showPopUp: (params: IShowPopUpOptions) => void;

    }
} 