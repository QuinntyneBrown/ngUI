module app.ui {
    
    class PopUpService implements IPopUpService {
        
        constructor(private $http: ng.IHttpService) {
            
        }

        public showPopUp = (params: IShowPopUpDto) => {
            if (this.popUpExists()) {
                this.removePopUpElement();
            }

            this.$http({ method: "GET", url: params.templateUrl }).then((results:any) => {
                var popUpElement = this.createPopUpElement(results.data);
                var dimension = this.getDimensionOfPopUpElement(popUpElement);
                this.stylePopUp(popUpElement, dimension);
                this.appendPopUpElementToBody(popUpElement);

                setTimeout(this.removePopUpElement, params.visibilityTimeInMs);
            });            
        }

        public computePosition = (triggerElement: Element, popUpElement: Element) => {
            
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

        public removePopUpElement = () => {
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
            this.removePopUpElement();
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

        public getPopUpElement = ():any => {
            document.getElementById("pop-up");
        }
    }

    angular.module("app.ui").service("popUpService", ["$http",PopUpService]);
}