﻿declare module app {
    
    interface IPopUp {

        viewBag: any;

        showPopUp: (params: IPopUpOptions) => ng.IPromise<any>;

    }
} 