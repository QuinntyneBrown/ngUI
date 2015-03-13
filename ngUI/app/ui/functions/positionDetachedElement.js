var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("positionDetachedElement", function (triggerElement, element, directionPriorityList, elementRect) {
            var triggerElementRect = triggerElement.getBoundingClientRect();
            var triggerElementVerticalMiddle = ((triggerElementRect.bottom - triggerElementRect.top) / 2) + triggerElementRect.top;
            var triggerElementHorizontalMiddle = ((triggerElementRect.right - triggerElementRect.left) / 2) + triggerElementRect.left;
            for (var i = 0; i < directionPriorityList.length; i++) {
                var lastOption = directionPriorityList.length == i + 1;
                switch (directionPriorityList[i]) {
                    case "top":
                        if (triggerElementRect.top > elementRect.height || lastOption) {
                            if (triggerElementRect.width > elementRect.width || lastOption) {
                                element.style.top = (triggerElementRect.top - elementRect.height) + "px";
                                element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.width - triggerElementRect.width) / 2;
                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    element.style.top = (triggerElementRect.top - elementRect.height) + "px";
                                    element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                    case "left":
                        if (triggerElementRect.left > elementRect.width || lastOption) {
                            if (triggerElementRect.height > elementRect.height || lastOption) {
                                element.style.left = (triggerElementRect.left - elementRect.width) + "px";
                                element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.height - triggerElementRect.height) / 2;
                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    element.style.left = (triggerElementRect.left - elementRect.width) + "px";
                                    element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                    case "bottom":
                        if (((window.innerHeight - triggerElementRect.bottom) > elementRect.height) || lastOption) {
                            if (triggerElementRect.width > elementRect.width || lastOption) {
                                element.style.top = triggerElementRect.bottom + "px";
                                element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.width - triggerElementRect.width) / 2;
                                if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                    element.style.top = triggerElementRect.bottom + "px";
                                    element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                    case "right":
                        if (((window.innerWidth - triggerElementRect.right) > elementRect.width) || lastOption) {
                            if (triggerElementRect.height > elementRect.height || lastOption) {
                                element.style.left = triggerElementRect.right + "px";
                                element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                return;
                            }
                            else {
                                var diff = (elementRect.height - triggerElementRect.height) / 2;
                                if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                    element.style.left = triggerElementRect.right + "px";
                                    element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                    return;
                                }
                            }
                        }
                        break;
                }
            }
            throw new Error("Unable to position place pop up.");
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=positionDetachedElement.js.map