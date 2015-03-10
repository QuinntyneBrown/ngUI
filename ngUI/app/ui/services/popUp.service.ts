module app.ui {
    
    class PopUpService implements IPopUpService {
        
        constructor(
            private $compile: ng.ICompileService,
            private $http: ng.IHttpService,
            private $timeout: ng.ITimeoutService) {            
        }

        public viewBag: any;

        public triggerElementRect: ClientRect;

        public timeout: ng.IPromise<any>;

        public transitionDurationInMilliseconds: number;

        public setViewBag = (data) => {
            this.viewBag = data;
        }

        public getViewBag = () => {
            return this.viewBag;
        }

        public showPopUp = (params: IShowPopUpDto) => {

            if (this.timeout) {
                this.$timeout.cancel(this.timeout);                
            }

            var triggerElementRect = params.element.getBoundingClientRect();

            if (this.triggerElementRect && this.triggerElementRect.top === triggerElementRect.top
                && this.triggerElementRect.left === triggerElementRect.left) {
                this.destroy(false);
                this.triggerElementRect = null;
                return;
            } else {
                this.destroy(true);
            } 


            this.triggerElementRect = triggerElementRect;

            this.transitionDurationInMilliseconds = params.transitionDurationInMilliseconds;

            this.setViewBag(params.viewBag);
            
            this.$http({ method: "GET", url: params.templateUrl }).then((results:any) => {

                var popUpElement = this.createPopUpElement(results.data);
                
                (<any>this.$compile)(popUpElement)(params.triggerScope);

                this.$timeout(() => {                                        
                    this.stylePopUp(popUpElement, false);

                    this.positionPopUpElement(params.element, popUpElement, params.directionPriorityList);                   

                    this.appendPopUpElementToBody(popUpElement);

                    this.$timeout(() => { popUpElement.style.opacity = "100"; }, 100);
                   
                    this.timeout = this.$timeout(()=> { this.destroy(false); }, params.visibilityDurationInMilliseconds);

                }, 0);


            });            
        }

        public positionPopUpElement = (triggerElement: Element, popUpElement: HTMLDivElement, directionPriorityList:string[]) => {

            var popUpElementRect: ClientRect = this.getDimensionOfPopUpElement(popUpElement);

            var triggerElementRect: ClientRect = triggerElement.getBoundingClientRect();

            for (var i = 0; i < directionPriorityList.length; i++) {

                switch (directionPriorityList[i]) {

                    case "top":

                        if (triggerElementRect.top > popUpElementRect.height) {

                            if (triggerElementRect.width > popUpElementRect.width) {
                                popUpElement.style.top = (triggerElementRect.top - popUpElementRect.height) + "px";
                                popUpElement.style.left = this.getMiddleOfElement(triggerElement,"horizontal") - (popUpElementRect.width / 2) + "px";
                                return;

                            } else {
                                var diff = (popUpElementRect.width - triggerElementRect.width) / 2;

                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    popUpElement.style.top = (triggerElementRect.top - popUpElementRect.height) + "px";
                                    popUpElement.style.left = this.getMiddleOfElement(triggerElement, "horizontal") - (popUpElementRect.width / 2) + "px";
                                    return;
                                }
                            }

                            
                        }

                        break;

                    case "left":
                        if (triggerElementRect.left > popUpElementRect.width) {

                            if (triggerElementRect.height > popUpElementRect.height) {
                                popUpElement.style.left = (triggerElementRect.left - popUpElementRect.width) + "px";
                                popUpElement.style.top = this.getMiddleOfElement(triggerElement, "vertical") - (popUpElementRect.height / 2) + "px";
                                return;
                            } else {
                                var diff = (popUpElementRect.height - triggerElementRect.height) / 2;

                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    popUpElement.style.left = (triggerElementRect.left - popUpElementRect.width) + "px";
                                    popUpElement.style.top = this.getMiddleOfElement(triggerElement, "vertical") - (popUpElementRect.height / 2) + "px";
                                    return;
                                }
                            }
                        }


                        break;

                    case "bottom":

                        if ((window.innerHeight - triggerElementRect.bottom) > popUpElementRect.height) {

                            if (triggerElementRect.width > popUpElementRect.width) {
                                popUpElement.style.top = triggerElementRect.bottom + "px";
                                popUpElement.style.left = this.getMiddleOfElement(triggerElement, "horizontal") - (popUpElementRect.width / 2) + "px";
                                return;

                            } else {

                                var diff = (popUpElementRect.width - triggerElementRect.width) / 2;

                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    popUpElement.style.top = triggerElementRect.bottom + "px";
                                    popUpElement.style.left = this.getMiddleOfElement(triggerElement, "horizontal") - (popUpElementRect.width / 2) + "px";
                                    return;
                                }
                            }
                        }

                        break;

                    case "right":


                        if ((window.innerWidth - triggerElementRect.right) > popUpElementRect.width) {

                            if (triggerElementRect.height > popUpElementRect.height) {
                                popUpElement.style.left = triggerElementRect.right + "px";
                                popUpElement.style.top = this.getMiddleOfElement(triggerElement, "vertical") - (popUpElementRect.height / 2) + "px";
                                return;
                            } else {

                                var diff = (popUpElementRect.height - triggerElementRect.height) / 2;

                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    popUpElement.style.left = triggerElementRect.right + "px";
                                    popUpElement.style.top = this.getMiddleOfElement(triggerElement, "vertical") - (popUpElementRect.height / 2) + "px";
                                    return;
                                }
                            }
                        }

                        break;
                }
            }

            throw new Error("Unable to position place pop up.");
        }

        public appendPopUpElementToBody = (popUpElement: Element) => {
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

        public getDimensionOfPopUpElement = (popUpElement: HTMLDivElement) => {             
            this.stylePopUp(popUpElement,true);
            this.appendPopUpElementToBody(popUpElement);
            var boundingRect = popUpElement.getBoundingClientRect();
            this.destroy(true);
            return boundingRect;
        }

        public stylePopUp = (popUpElement: any, hidden: boolean) => {
            popUpElement.setAttribute("class", "pop-up");
            popUpElement.setAttribute("style", "-webkit-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;-o-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;transition: opacity " + this.transitionDurationInMilliseconds +"ms ease-in-out;");
            popUpElement.style.opacity = "0";
            popUpElement.style.position = "absolute";
            popUpElement.style.display = "block";
            var innerElement = popUpElement.querySelector(".inner");
            innerElement.setAttribute("style", "-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border-radius:5px;");
            innerElement.style.margin = "5px";
            innerElement.style.border = "1px solid #cccccc";
            innerElement.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
        }

        public popUpExists = () => {
            return document.getElementById("pop-up") != null;
        }

        public getPopUpElement = (): Element => {
            return document.getElementById("pop-up");
        }

        public getRemainingWindowSpace = (direction: string, target: Element) => {

            var rect: ClientRect = target.getBoundingClientRect();

            switch (direction) {
                case "top":
                    return rect.top;

                case "bottom":
                    return screen.availHeight - rect.bottom;

                case "left":
                    return rect.left;

                case "right":
                    return screen.availWidth - rect.right;                
            }

            return 0;
        }

        public getMiddleOfElement(element: Element, orientation: string) {

            var clientRect = element.getBoundingClientRect();

            if (orientation === "vertical") {
                return ((clientRect.bottom - clientRect.top) / 2) + clientRect.top;
            }

            if (orientation === "horizontal") {
                return ((clientRect.right - clientRect.left) / 2) + clientRect.left;
            }

        }
    }

    angular.module("app.ui").service("popUpService", ["$compile","$http","$timeout",PopUpService]);
}