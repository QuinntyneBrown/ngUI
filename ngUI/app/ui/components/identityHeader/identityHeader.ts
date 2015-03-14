module app.ui {

    "use strict";

    class IdentityHeader implements ng.IDirective {

        constructor() {
            this.link = this._link.bind(this);
        }

		static instance(): ng.IDirective {
            return new IdentityHeader();
        }

        link: (scope: any, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => void;

        _link(scope: any, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) {

            scope.identityHeader = this;

            scope.identityHeader.navigationLinks = scope.navigationLinks;

            scope.identityHeader.element = element[0];

            scope.identityHeader.attributes = attributes;

        }

        public replace: boolean = true;

        public scope: any = {
            navigationLinks: "=",
            isAuthenticated: "=",
            getUsername: "="
        };

        public templateUrl: string = "/app/ui/components/identityHeader/identityHeader.html";

        public restrict: string = "E";     
        
        public navigationLinks:INavigationLink[];

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

    angular.module("app.ui").directive("identityHeader",[IdentityHeader.instance]);

}
