/// <reference path="../../typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var matters;
    (function (matters) {
        var service;
        (function (service) {
            'use strict';
            var Matter = (function () {
                function Matter() {
                }
                return Matter;
            })();
            service.Matter = Matter;
            var MatterService = (function () {
                function MatterService($http) {
                    this.$http = $http;
                }
                MatterService.prototype.getMatters = function () {
                    return this.$http.get('/api/matters').then(function (response) {
                        return response.data;
                    });
                };
                MatterService.prototype.addMatter = function (matter) {
                    return this.$http.post('api/matters', matter).then(function (response) {
                        return response.data;
                    });
                };
                MatterService.$inject = ['$http'];
                return MatterService;
            })();
            service.MatterService = MatterService;
        })(service = matters.service || (matters.service = {}));
    })(matters = app.matters || (app.matters = {}));
})(app || (app = {}));
