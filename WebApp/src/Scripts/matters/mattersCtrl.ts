module app.matters.controller {

    import Matter = app.matters.service.Matter;

    interface IMatterScope {
        getMatters(): ng.IPromise<Matter[]>;
        
    }

    class MattersCtrl implements IMatterScope {

        constructor() {

        }

    }

}