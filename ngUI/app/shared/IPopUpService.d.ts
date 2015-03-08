declare module app {
    
    interface IPopUpService {

        showPopUp(params: IShowPopUpDto): void;

        popUpExists():boolean;
    }
} 