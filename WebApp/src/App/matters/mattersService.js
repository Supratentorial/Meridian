/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="mattermodels.ts" />
var matters;
(function (matters) {
    'use strict';
    var MatterService = (function () {
        function MatterService($http) {
            this.$http = $http;
        }
        MatterService.prototype.getAllMatters = function () {
            var matter = new models.Matter();
            matter.id = 1;
            matter.clientName = "Mumford";
            var matterList = [matter];
            return matterList;
        };
        MatterService.prototype.addMatter = function (matter) {
            return this.$http.post('api/matters', matter).then(function (response) {
                return response.data;
            });
        };
        MatterService.$inject = ['$http'];
        return MatterService;
    })();
    matters.MatterService = MatterService;
    angular.module('matters').service('MattersService', MatterService);
})(matters || (matters = {}));
