module app.ui {

    class Carousel {

        constructor() {
            this.link = this._link.bind(this);
        }

        static instance(): ng.IDirective {
            return new Carousel();
        }

        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        public replace: boolean = true;

        public scope: any = {};

        public templateUrl = "/app/ui/components/carousel/carousel.html";

        _link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

            var _this = this;

        }
    }

    angular.module("app.ui").service("carousel", [Carousel]);
} 