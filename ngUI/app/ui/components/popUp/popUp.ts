module app.ui {
    
    class PopUp implements IPopUp {
        
        constructor(
            private $compile: ng.ICompileService,
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $timeout: ng.ITimeoutService,
            private clientRectEquals: IClientRectEquals,
            private getBoundingRectForDetachedElement: IGetBoundingRectForDetachedElement,
            private positionDetachedElement: IPositionDetachedElement) {            
        }

        public viewBag: any;

        private triggerElementRect: ClientRect;

        private timeout: ng.IPromise<any>;

        private transitionDurationInMilliseconds: number;

        private visibilityDurationInMilliseconds: number;

        private triggerElement: HTMLElement;

        private popUpElement: HTMLElement;

        private triggerScope: IPopUpTriggerScope;

        private htmlTemplate: string;

        private initialize = (params: IPopUpOptions) => {

            this.triggerElement = params.element;

            this.triggerScope = params.triggerScope;

            this.visibilityDurationInMilliseconds = params.visibilityDurationInMilliseconds;

            this.triggerElementRect = params.element.getBoundingClientRect();

            this.transitionDurationInMilliseconds = params.transitionDurationInMilliseconds;

            this.viewBag = params.viewBag;
        }

        public showPopUp = (params: IPopUpOptions) => {

            var deferred = this.$q.defer();

            this.cancelScheduledDestructionOfElement();

            if (this.clientRectEquals(this.triggerElementRect, params.element.getBoundingClientRect())) {
                this.destroy(false);
                this.triggerElementRect = null;

                deferred.resolve();

                return deferred.promise;
            } else {
                this.destroy(true);
            }

            this.initialize(params);
            
            this.fetchAndSetTemplateAsync(params.templateUrl).then(() => {

                var popUpElement = this.createPopUpElement(this.htmlTemplate);

                (<any>this.$compile)(popUpElement)(params.triggerScope);

                this.$timeout(() => {
                    this.stylePopUp(popUpElement);
                    
                    this.positionDetachedElement(params.element, popUpElement, params.directionPriorityList, this.getBoundingRectForDetachedElement(popUpElement));

                    this.appendPopUpElementToBody(popUpElement);

                    this.hideElementAsync(popUpElement, params.visibilityDurationInMilliseconds).then((results:any) => {
                        deferred.resolve(results);
                    });

                }, 0);
            });

            return deferred.promise;
        }

        public fetchAndSetTemplateAsync = (templateUrl: string) => {
            return this.$http({ method: "GET", url: templateUrl }).then((results:any) => {
                this.htmlTemplate = results.data;
            });
        }

        public hideElementAsync = (element: HTMLElement, visibilityDurationInMilliseconds: number) => {
            return this.$timeout(() => { element.style.opacity = "100"; }, 100).then(() => {
                return this.scheduleDestructionAsync(visibilityDurationInMilliseconds);
            });
        }

        public scheduleDestructionAsync = (visibilityDurationInMilliseconds: number) => {

            this.timeout = this.$timeout(() => { this.destroy(false); }, visibilityDurationInMilliseconds);

            return this.timeout;

        }

        public cancelScheduledDestructionOfElement() {
            if (this.timeout) {
                this.$timeout.cancel(this.timeout);
            }
        }

        public appendPopUpElementToBody = (popUpElement: HTMLElement) => {
            document.body.appendChild(popUpElement);
        }

        public createPopUpElement = (template: string) => {
            var popUpElement = document.createElement("div");
            popUpElement.id = "pop-up";

            var arrowElement = document.createElement("div");
            popUpElement.appendChild(arrowElement);

            var innerElement = document.createElement("div");
            innerElement.setAttribute("class", "inner");
            innerElement.innerHTML = template;
            popUpElement.appendChild(innerElement);

            return popUpElement;
        }

        public destroy = (force: boolean) => {

            if (!force) {
                var popUpElement = document.getElementById("pop-up");

                this.$timeout(() => { popUpElement.style.opacity = "0"; }, 0);

                this.triggerElementRect = null;

                this.$timeout(() => {

                    if (popUpElement) {
                        try {
                            var parentNode = popUpElement.parentNode;
                            parentNode.removeChild(popUpElement);
                        } catch (error) {

                        }
                    }
                }, this.transitionDurationInMilliseconds);

            } else {
                var popUpElement = document.getElementById("pop-up");

                if (popUpElement) {
                    try {
                        var parentNode = popUpElement.parentNode;
                        parentNode.removeChild(popUpElement);
                    } catch (error) {

                    }
                }
            }
        }

        public stylePopUp = (popUpElement: HTMLElement) => {
            popUpElement.setAttribute("class", "pop-up");
            popUpElement.setAttribute("style", "-webkit-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;-o-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;transition: opacity " + this.transitionDurationInMilliseconds +"ms ease-in-out;");
            popUpElement.style.opacity = "0";
            popUpElement.style.position = "absolute";
            popUpElement.style.display = "block";
            var innerElement: HTMLElement = <HTMLElement>popUpElement.querySelector(".inner");
            innerElement.setAttribute("style", "-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border-radius:5px;");
            innerElement.style.margin = "5px";
            innerElement.style.border = "1px solid #cccccc";
            innerElement.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
        }

        public getPopUpElement = (): HTMLElement => {
            return document.getElementById("pop-up");
        }
    }

    angular.module("app.ui").service("popUp", [
        "$compile",
        "$http",
        "$q",
        "$timeout",
        "clientRectEquals",
        "getBoundingRectForDetachedElement",
        "positionDetachedElement",
        PopUp]);
}