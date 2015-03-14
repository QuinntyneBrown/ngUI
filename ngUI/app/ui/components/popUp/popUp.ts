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

        public showPopUp = (popUpOptions: IPopUpOptions) => {

            var deferred = this.$q.defer();

            this.$timeout.cancel(this.timeoutPromise);

            if (this.clientRectEquals(this.triggerElementRect, popUpOptions.element.getBoundingClientRect())) {
                this.triggerElementRect = null;
                this.hideAsync().then(() => {
                    this.destroy(true);
                    deferred.resolve();
                    
                });

                return deferred.promise;
                
            } else {
                this.destroy(true);
            }
            this.initialize(popUpOptions);  
                      
            this.fetchAndSetTemplateAsync(popUpOptions.templateUrl).then(() => {
                this.popUpElement = this.createPopUpElement(this.htmlTemplate);

                (<any>this.$compile)(this.popUpElement)(popUpOptions.triggerScope);

                this.$timeout(() => {
                    this.stylePopUp(this.popUpElement);                    
                    this.positionDetachedElement(popUpOptions.element, this.popUpElement, popUpOptions.directionPriorityList, this.getBoundingRectForDetachedElement(this.popUpElement),this.alignment);
                    document.body.appendChild(this.popUpElement);
                    this.$timeout(() => {
                        this.popUpElement.style.opacity = "100";

                        this.hideElementAsync(this.popUpElement, popUpOptions.visibilityDurationInMilliseconds).then((results: any) => {

                        }).then(() => {
                            deferred.resolve();
                        });

                    }, 100);

                }, 0);
            });
            return deferred.promise;
        }

        public dismiss = () => {

            var deferred = this.$q.defer();

            this.$timeout.cancel(this.timeoutPromise);

            var popUpElement = document.querySelector("#pop-up");

            if (popUpElement) {
                this.triggerElementRect = null;
                this.hideAsync().then(() => {
                    this.destroy(true);
                    deferred.resolve();

                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }
        private initialize = (popUpOptions: IPopUpOptions) => {
            this.alignment = popUpOptions.alignment || "center";
            this.margin = popUpOptions.margin || "5px";
            this.triggerElement = popUpOptions.element;
            this.triggerScope = popUpOptions.triggerScope;
            this.visibilityDurationInMilliseconds = popUpOptions.visibilityDurationInMilliseconds;
            this.triggerElementRect = popUpOptions.element.getBoundingClientRect();
            this.transitionDurationInMilliseconds = popUpOptions.transitionDurationInMilliseconds;
            this.viewBag = popUpOptions.viewBag;
        }

        private fetchAndSetTemplateAsync = (templateUrl: string) => {
            return this.$http({ method: "GET", url: templateUrl }).then((results:any) => {
                this.htmlTemplate = results.data;
            });
        }

        private hideElementAsync = (element: HTMLElement, visibilityDurationInMilliseconds: number) => {

            var deferred = this.$q.defer();

            this.timeoutPromise = this.$timeout(() => {
                this.destroy(false).then(() => {
                    deferred.resolve();
                });
            }, visibilityDurationInMilliseconds);

            return deferred.promise;
        }

        private processResponse(results) {
            var deferred = this.$q.defer();

            this.createPopUpElement(results.data);

            (<any>this.$compile)(this.popUpElement)(this.triggerScope);

            deferred.resolve();
            return deferred.promise;
        }
        private createPopUpElement = (template: string) => {
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

        private destroy = (force: boolean) => {

            var deferred = this.$q.defer();

            var popUpElement = document.getElementById("pop-up");

            if (!force) {
                this.$timeout(() => { popUpElement.style.opacity = "0"; }, 0)
                    .then(() => {

                    this.triggerElementRect = null;
                    this.$timeout(() => {
                        if (popUpElement && popUpElement.parentNode) {
                            popUpElement.parentNode.removeChild(popUpElement);
                        }
                    }, this.transitionDurationInMilliseconds).then(() => {
                        deferred.resolve();
                    });
                });
                
                return deferred.promise;

            } else {
                

                if (popUpElement) {
                    try {
                        popUpElement.parentNode.removeChild(popUpElement);
                    } catch (error) {
                        console.log("error");
                    }
                }
            }
        }

        private setOpacityToZeroAsync = () => {
            var deferred = this.$q.defer();

            this.$timeout(() => {
                this.popUpElement.style.opacity = "0";
                deferred.resolve();
            }, 0);

            return deferred.promise;
        }

        private waitForTransitionAsync = () => {
            var deferred = this.$q.defer();

            this.$timeout(() => {
                deferred.resolve();
            }, this.transitionDurationInMilliseconds);

            return deferred.promise;
        }

        private hideAsync = () => {

            var deferred = this.$q.defer();

            this.setOpacityToZeroAsync()
                .then(this.waitForTransitionAsync)
                .then(() => {
                deferred.resolve();
            });


            return deferred.promise;
        }
        private stylePopUp = (popUpElement: HTMLElement) => {
            popUpElement.setAttribute("class", "pop-up");
            popUpElement.setAttribute("style", "-webkit-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;-o-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;transition: opacity " + this.transitionDurationInMilliseconds +"ms ease-in-out;");
            popUpElement.style.opacity = "0";
            popUpElement.style.backgroundColor = "white";
            popUpElement.style.position = "absolute";
            popUpElement.style.display = "block";
            var innerElement: HTMLElement = <HTMLElement>popUpElement.querySelector(".inner");
            innerElement.setAttribute("style", "-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border-radius:5px;");
            innerElement.style.backgroundColor = "white";
            innerElement.style.margin = this.margin;
            innerElement.style.border = "1px solid #cccccc";
            innerElement.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
        }

        private triggerElementRect: ClientRect;

        private timeoutPromise: ng.IPromise<any>;

        private transitionDurationInMilliseconds: number;

        private visibilityDurationInMilliseconds: number;

        private triggerElement: HTMLElement;

        private popUpElement: HTMLElement;

        private triggerScope: IPopUpTriggerScope;

        private htmlTemplate: string;

        private alignment: string;

        private margin: string;

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