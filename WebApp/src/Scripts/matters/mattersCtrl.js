/// <reference path="matterinterfaces.ts" />
var matters;
(function (matters) {
    var MattersCtrl = (function () {
        function MattersCtrl(mattersService) {
            this.mattersService = mattersService;
        }
        MattersCtrl.prototype.getAllMatters = function () {
            this.matters = this.mattersService.getAllMatters();
        };
        MattersCtrl.$inject = ['matters.matterService'];
        return MattersCtrl;
    })();
    matters.MattersCtrl = MattersCtrl;
    angular.module('matters').controller('matters.MattersCtrl', MattersCtrl);
})(matters || (matters = {}));
