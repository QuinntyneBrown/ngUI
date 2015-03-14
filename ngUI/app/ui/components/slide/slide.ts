module app.ui {
    
    class Slide {

        constructor() {
            this.link = this._link.bind(this);
        }

        static instance(): ng.IDirective {
            return new Slide();
        }

        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        
        public replace: boolean = true;

        public scope: any = {};

        public templateUrl = "/app/ui/components/slide/slide.html";

        _link(scope: any, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) {

            scope.slide = this;

            scope.slide.element = element[0];

            scope.slide.attributes = attributes;

        }

        private _attributes: ng.IAttributes;

        public set attributes(attributes: ng.IAttributes) {

            this._attributes = attributes;
        }

        public get attributes() {

            return this._attributes;
        }


        private _element: HTMLElement;

        public set element(element: HTMLElement) {

            this._element = element;
        }

        public get element() {

            return this._element;
        }


    }

    angular.module("app.ui").directive("slide", [Slide.instance]);

}
 