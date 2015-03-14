module app.ui {
    
    class GalleryItem {

        constructor() {
            this.link = this._link.bind(this);
        }

        static instance(): ng.IDirective {
            return new GalleryItem();
        }

        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        _link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

            var _this = this;

        }

        public replace: boolean = true;

        public scope: any = {};

        public templateUrl = "/app/ui/components/galleryItem/galleryItem.html";

    }

    angular.module("app.ui").service("galleryItem", [GalleryItem]);
} 