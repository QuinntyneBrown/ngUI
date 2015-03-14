module app.ui {
    

    class Gallery {

        constructor() {
            this.link = this._link.bind(this);
        }

        static instance(): ng.IDirective {
            return new Gallery();
        }

        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        _link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

            var _this = this;

        }

        public replace: boolean = true;

        public scope: any = {};

        public templateUrl = "/app/ui/components/gallery/gallery.html";


    }

    angular.module("app.ui").service("gallery", [Gallery]);
} 