/// <reference path="matterinterfaces.ts" />

module matters {

    export class MattersCtrl implements interfaces.IMattersScope {

        mattersService: interfaces.IMattersService;
        matters: Array<interfaces.IMatter>;

        static $inject = ['matters.matterService'];
        constructor(mattersService: interfaces.IMattersService) {
            this.mattersService = mattersService;
        }

        getAllMatters() {
            this.matters = this.mattersService.getAllMatters();
        }
    }

    angular.module('matters').controller('matters.MattersCtrl', MattersCtrl);
}