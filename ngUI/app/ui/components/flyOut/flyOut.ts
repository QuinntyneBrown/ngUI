"use strict";

module app.ui {

    class FlyOut  implements ng.IDirective {

        constructor() {
            this.link = this._link.bind(this);
        }

		static instance(): ng.IDirective {
            return new FlyOut();
        }

		// ng.IFlyOutScope

		link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        _link(scope: any, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) {

            scope.flyOut = this;

            scope.flyOut.element = element[0];

            scope.flyOut.attributes = attributes;

        }

        public replace: boolean = true;

        public scope: any = {};

        public templateUrl: string = "/app/ui/components/flyOut/flyOut.html";

        public restrict: string = "E";   

		
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

    angular.module("app.ui").directive("flyOut",[FlyOut.instance]);

}
