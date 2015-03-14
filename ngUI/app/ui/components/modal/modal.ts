module app.ui {

    "use strict";

    class Modal  implements ng.IDirective {

        constructor() {
            this.link = this._link.bind(this);
        }

		static instance(): ng.IDirective {
            return new Modal();
        }

		// ng.IModalScope

		link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        _link(scope: any, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) {

            scope.modal = this;

            scope.modal.element = element[0];

            scope.modal.attributes = attributes;

        }

        public replace: boolean = true;

        public scope: any = {};

        public templateUrl: string = "/app/ui/components/modal/modal.html";

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

    angular.module("app.ui").directive("modal",[Modal.instance]);

}
