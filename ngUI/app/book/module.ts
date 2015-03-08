module app.book {

    angular.module("app.book", [
            "ngRoute"
        ])
        .config(["$routeProvider", config])
        .run([run]);

    function config($routeProvider) {

        $routeProvider.when("/book",
            {
                templateUrl: "app/book/templates/index.html",
                resolve: {
                    routeData: []
                },
                authorizationRequired: false,
                caseInsensitiveMatch: true

            });

        //$routeProvider.otherwise("/");
    }

    function run() {
        
    }

	export class BookController {

        constructor() {

        }

    }

	angular.module("app.book").controller("bookController", [BookController]);

} 
