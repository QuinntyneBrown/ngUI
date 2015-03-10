module app.ui {
    
    class PopUpService implements IPopUpService {
        
        constructor(private $http: ng.IHttpService, private $compile: ng.ICompileService) {
            
        }

        public viewBag:any;

        public setViewBag = (data) => {
            this.viewBag = data;
        }

        public getViewBag = () => {
            return this.viewBag;
        }

        public showPopUp = (params: IShowPopUpDto) => {
            if (this.popUpExists()) {
                this.destroy();
            }

            this.setViewBag(params.viewBag);
            
            this.$http({ method: "GET", url: params.templateUrl }).then((results:any) => {

                var popUpElement = this.createPopUpElement(results.data);
                
                (<any>this.$compile)(popUpElement)(params.triggerScope);

                setTimeout(() => {                                        
                    this.stylePopUp(popUpElement, false);
                    this.positionPopUpElement(params.element, popUpElement, params.directionPriorityList);                   
                    this.appendPopUpElementToBody(popUpElement);

                    setTimeout(() => { popUpElement.style.opacity = "100"; }, 10);
                   
                    setTimeout(this.destroy, params.visibilityTimeInMs);

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
                                popUpElement.style.left = this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                return;

                            } else {
                                var diff = (popUpElementRect.width - triggerElementRect.width) / 2;

                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    popUpElement.style.top = (triggerElementRect.top - popUpElementRect.height) + "px";
                                    popUpElement.style.left = this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                    return;
                                }
                            }

                            
                        }

                        break;

                    case "left":
                        if (triggerElementRect.left > popUpElementRect.width) {

                            if (triggerElementRect.height > popUpElementRect.height) {
                                popUpElement.style.left = (triggerElementRect.left - popUpElementRect.width) + "px";
                                popUpElement.style.top = this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
                                return;
                            } else {
                                var diff = (popUpElementRect.height - triggerElementRect.height) / 2;

                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    popUpElement.style.left = (triggerElementRect.left - popUpElementRect.width) + "px";
                                    popUpElement.style.top = this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
                                    return;
                                }
                            }
                        }


                        break;

                    case "bottom":

                        if ((window.innerHeight - triggerElementRect.bottom) > popUpElementRect.height) {

                            if (triggerElementRect.width > popUpElementRect.width) {
                                popUpElement.style.top = triggerElementRect.bottom + "px";
                                popUpElement.style.left = this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                return;

                            } else {

                                var diff = (popUpElementRect.width - triggerElementRect.width) / 2;

                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    popUpElement.style.top = triggerElementRect.bottom + "px";
                                    popUpElement.style.left = this.getHorizontalMiddle(triggerElement) - (popUpElementRect.width / 2) + "px";
                                    return;
                                }
                            }
                        }

                        break;

                    case "right":


                        if ((window.innerWidth - triggerElementRect.right) > popUpElementRect.width) {

                            if (triggerElementRect.height > popUpElementRect.height) {
                                popUpElement.style.left = triggerElementRect.right + "px";
                                popUpElement.style.top = this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
                                return;
                            } else {

                                var diff = (popUpElementRect.height - triggerElementRect.height) / 2;

                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    popUpElement.style.left = triggerElementRect.right + "px";
                                    popUpElement.style.top = this.getVerticalMiddle(triggerElement) - (popUpElementRect.height / 2) + "px";
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
            var div = document.createElement("div");
            div.id = "pop-up";
            var container = document.createElement("div");
            container.setAttribute("class", "container");
            container.innerHTML = template;
            div.appendChild(container);
            return div;
        }

        public destroy = () => {
            var popUpElement = document.getElementById("pop-up");

            if (popUpElement) {
                try {
                    var parentNode = popUpElement.parentNode;
                    parentNode.removeChild(popUpElement);
                } catch (error) {
                    
                }
            }
        }

        public getDimensionOfPopUpElement = (popUpElement: HTMLDivElement) => {             
            this.stylePopUp(popUpElement,true);
            this.appendPopUpElementToBody(popUpElement);
            var boundingRect = popUpElement.getBoundingClientRect();
            this.destroy();
            return boundingRect;
        }

        public stylePopUp = (popUpElement: any, hidden: boolean) => {
            popUpElement.setAttribute("class", "pop-up");
            popUpElement.setAttribute("style", "-webkit-transition: opacity 0.500s ease-in-out;-o-transition: opacity 0.500s ease-in-out;transition: opacity 0.500s ease-in-out;");
            popUpElement.style.opacity = "0";
            popUpElement.style.position = "absolute";
            popUpElement.style.display = "block";
            popUpElement.childNodes[0].setAttribute("style", "-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border-radius:5px;");
            popUpElement.childNodes[0].style.margin = "5px";
            popUpElement.childNodes[0].style.border = "1px solid #cccccc";
            popUpElement.childNodes[0].style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
        }

        public popUpExists = () => {
            return document.getElementById("pop-up") != null;
        }

        public getPopUpElement = ():Element => {
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

        public getVerticalMiddle = (element: Element) => {
            var clientRect = element.getBoundingClientRect();
            return ((clientRect.bottom - clientRect.top) / 2) + clientRect.top;
        }

        public getHorizontalMiddle = (element: Element) => {
            var clientRect = element.getBoundingClientRect();
            return ((clientRect.right - clientRect.left) / 2) + clientRect.left;
        }
    }

    angular.module("app.ui").service("popUpService", ["$http","$compile",PopUpService]);
}