/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var app;
(function (app_1) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$stateProvider.state('matterState', {
                url: '/matters',
                templateUrl: '/html/matters/mattersPartial.html'
            });
        }
        StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
        return StateConfig;
    })();
    app_1.StateConfig = StateConfig;
    app_1.app = angular.module('app', ['ui-router']);
    app_1.app.config(StateConfig);
})(app || (app = {}));
