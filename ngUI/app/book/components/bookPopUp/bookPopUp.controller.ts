 module app.book {
     
     class BookPopUpController {
         
         constructor(public popUp: IPopUp) {

             var viewBag = popUp.viewBag;

             this.title = viewBag.title;
         }

         public title:string;
         
     }

     angular.module("app.book").controller("bookPopUpController", ["popUp",BookPopUpController]);
 }