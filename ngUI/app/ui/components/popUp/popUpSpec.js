describe("Pop Up Tests", function() {

    var _popUp;

    beforeEach(angular.mock.module("app.ui"));

    beforeEach(inject(function (popUp) {
        _popUp = popUp;
    }));

    it("should be defined", function () {
        expect(_popUp).toBeDefined();
    });
});