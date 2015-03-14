 module app.book {
     
     class BookPopUpController {
         
         constructor(public popUp: IPopUp) {

             var viewBag = popUp.viewBag;

             this.dismiss = popUp.dismiss;

             this.title = viewBag.title;
         }

         public dismiss:() => ng.IPromise<any>;

         public title:string;
         
     }

     angular.module("app.book").controller("bookPopUpController", ["popUp",BookPopUpController]);
 }