/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module app {
    export class StateConfig {
        static $inject = ['$stateProvider', '$urlRouterProvider'];

        constructor(private $stateProvider:ng.ui.IStateProvider, private $urlRouterProvider:ng.ui.IUrlRouterProvider) {
            this.$stateProvider
                .state('matters', <ng.ui.IState>{
                    url: '/matters',
                    templateUrl: '/html/matters/mattersPartial.html'
                })
                .state('dashboard', <ng.ui.IState>{
                    url: '/',
                    templateUrl: 'html/dashboard/dashboardPartial.html'
                })
                .state('contacts', <ng.ui.IState>{
                    url: '/contacts',
                    templateUrl: 'html/contacts/contactsPartial.html'
                })
        }
    }
    export var app:ng.IModule = angular.module('app', ['ui.router']);
    app.config(StateConfig);
}