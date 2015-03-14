module app.ui {
    
    class CarouselItem {

        constructor() {
            this.link = this._link.bind(this);
        }

        static instance(): ng.IDirective {
            return new CarouselItem();
        }

        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        public replace: boolean = true;

        public scope:any = {};

        public templateUrl = "/app/ui/components/carouselItem/carouselItem.html";

        _link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

            var _this = this;

        }
    }

    angular.module("app.ui").service("carouselItem", [CarouselItem]);
} 