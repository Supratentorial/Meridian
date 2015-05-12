module interfaces {
    export interface IMatter {
    }

    export interface IMattersScope {

    }

    export interface IMattersService {
        getAllMatters(): Array<interfaces.IMatter>;

    }

}