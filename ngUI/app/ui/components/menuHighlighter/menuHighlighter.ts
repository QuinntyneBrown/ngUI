module app.ui {

    class MenuHighlighter {

        static instance(): ng.IDirective {
            return new MenuHighlighter();
        }

        templateUrl = "";

        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        constructor() {
            this.link = this._link.bind(this);
        }

        _link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

            var _this = this;

        }
    }

    angular.module("app.ui").service("menuHighlighter", [MenuHighlighter]);
}  