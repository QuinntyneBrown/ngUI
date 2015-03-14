module app.book {
    
    export class Routes {
        static configure($routeProvider: ng.route.IRouteProvider) {

            $routeProvider
                .when('/', {
                templateUrl: '/app/book/templates/index.html',
                });

            $routeProvider
                .when('/list', {
                    templateUrl: '/app/book/templates/list.html',
                });

            $routeProvider.otherwise("/");
        }
    }
} 