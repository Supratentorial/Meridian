/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module app {
    export var app : ng.IModule = angular.module('app', ['matters', 'ui.router']);
    
    export class StateConfig {
        constructor(private $stateProvier: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            $stateProvier.state('matterState', {
                url: '/matters',
                templateUrl: '/'
            });
        }
    }
    StateConfig.$inject = ['$stateProvider'];
    app.config([StateConfig]);
}