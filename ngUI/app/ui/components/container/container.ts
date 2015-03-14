module app.ui {

    "use strict";

    class Container  implements ng.IDirective {

        constructor() {
            this.link = this._link.bind(this);
        }

		static instance(): ng.IDirective {
            return new Container();
        }

		// ng.IContainerScope

		link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        _link(scope: any, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) {

            scope.container = this;

            scope.container.navigationLinks = scope.navigationLinks;

            scope.container.logoUrl = scope.logoUrl;

            scope.container.element = element[0];

            scope.container.attributes = attributes;

        }

        public replace: boolean = true;

        public scope: any = {
            navigationLinks: "=",
            isAuthenticated: "=",
            logoUrl:"=",
            getUsername: "="
        };

        public templateUrl: string = "/app/ui/components/container/container.html";

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

    angular.module("app.ui").directive("container",[Container.instance]);

}
