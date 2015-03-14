module app.ui {

    class List {

        constructor() {
            this.link = this._link.bind(this);
        }

        static instance(): ng.IDirective {
            return new List();
        }

        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

        _link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

            var _this = this;

        }

        public replace: boolean = true;

        public scope: any = {};

        public templateUrl = "/app/ui/components/list/list.html";

    }

    angular.module("app.ui").service("list", [List]);
} 