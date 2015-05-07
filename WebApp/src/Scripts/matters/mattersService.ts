/// <reference path="../../typings/angularjs/angular.d.ts" />

module app.matters.service {
    'use strict'

    export interface IMattersService {
        getMatters(): ng.IPromise<Matter[]>;
        addMatter(matter: Matter): ng.IPromise<Matter>;
    }

    export class Matter {
        id: number;
        clientName: string;
        
    }

    export class MatterService implements IMattersService {
        static $inject = ['$http'];

        constructor(private $http: ng.IHttpService) { }

        getMatters(): ng.IPromise<Matter[]> {
            return this.$http.get('/api/matters').then((response: ng.IHttpPromiseCallbackArg<Matter[]>): Matter[]=> {
                return <Matter[]>response.data
            });
        }

        addMatter(matter: Matter): ng.IPromise<Matter> {

            return this.$http.post('api/matters', matter).then((response: ng.IHttpPromiseCallbackArg<Matter>): any => {
                return <Matter>response.data;
            });
        }
    }
}