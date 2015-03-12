module app.ui {

    angular.module("app.ui").value("bind",(element, o) => {
        if (element) {
            for (var event in o) {
                var callback = o[event];

                event.split(/\s+/).forEach((event) => {
                    element.addEventListener(event, callback);
                });
            }
        }
    });
} 