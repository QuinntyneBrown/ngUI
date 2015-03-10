describe("Pop Up Service Tests", function() {

    var _popUpService;

    beforeEach(angular.mock.module("app.ui"));

    beforeEach(inject(function (popUpService) {
        _popUpService = popUpService;
    }));

    it("should be defined", function () {
        expect(_popUpService).toBeDefined();
    });
});
