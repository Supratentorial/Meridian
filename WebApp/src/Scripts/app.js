/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var app;
(function (app_1) {
    app_1.app = angular.module('app', ['matters', 'ui.router']);
    var StateConfig = (function () {
        function StateConfig($stateProvier, $urlRouterProvider) {
            this.$stateProvier = $stateProvier;
            this.$urlRouterProvider = $urlRouterProvider;
            $stateProvier.state('matterState', {
                url: '/matters',
                templateUrl: ''
            });
        }
        return StateConfig;
    })();
    app_1.StateConfig = StateConfig;
    StateConfig.$inject = ['$stateProvider'];
    app_1.app.config([StateConfig]);
})(app || (app = {}));
