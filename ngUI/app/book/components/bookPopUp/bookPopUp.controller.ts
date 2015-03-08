 module app.book {
     
     class BookPopUpController {
         
         constructor(public popUpService) {

             var viewBag = popUpService.getViewBag();

             this.title = viewBag.title;
         }

         public title:string;
         
     }

     angular.module("app.book").controller("bookPopUpController", ["popUpService",BookPopUpController]);
 }