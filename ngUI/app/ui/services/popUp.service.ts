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
                    
                    var dimension = this.getDimensionOfPopUpElement(popUpElement);

                    this.stylePopUp(popUpElement, dimension);

                    this.appendPopUpElementToBody(popUpElement);

                    setTimeout(this.destroy, params.visibilityTimeInMs);

                }, 0);


            });            
        }

        public computePosition = (triggerElement: Element, popUpElement: Element, directionPriorityList:string[]) => {

            var popUpElementRect: ClientRect = this.getDimensionOfPopUpElement(popUpElement);

            for (var i = 0; i++; i < directionPriorityList.length) {

                switch (directionPriorityList[i]) {

                    case "top":

                    case "left":

                    case "bottom":

                    case "right":
                    
                }
            }
        }

        public appendPopUpElementToBody = (popUpElement: Element) => {
            document.body.appendChild(popUpElement);
        }

        public createPopUpElement = (template: string) => {
            var div = document.createElement("popup");
            div.id = "pop-up";
            div.innerHTML = template;
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

        public getDimensionOfPopUpElement = (popUpElement: Element) => {             
            this.stylePopUpAsHidden(popUpElement);
            this.appendPopUpElementToBody(popUpElement);
            var boundingRect = popUpElement.getBoundingClientRect();
            this.destroy();
            return boundingRect;
        }

        public stylePopUp = (popUpElement: Element, dimensions:any) => {
            popUpElement.setAttribute("class", "pop-up");
            popUpElement.setAttribute("style", "position:absolute;display:block;");
        }

        public stylePopUpAsHidden = (popUpElement: Element) => {
            popUpElement.setAttribute("class", "pop-up");
            popUpElement.setAttribute("style", "position:absolute;display:block;opacity:0;");
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

    }

    angular.module("app.ui").service("popUpService", ["$http","$compile",PopUpService]);
}