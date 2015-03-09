module app.book {

    angular.module("app.book", [
            "app.ui",
            "ngRoute"
        ])
        .config(["$routeProvider", config]);
    
    function config($routeProvider) {

        //$routeProvider.otherwise("/");
    }



} 
