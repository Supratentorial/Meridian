module interfaces {
    export interface IContact {
        id : number;
        title : string;
        firstName : string;
        lastName : string;
        middleNames : IMiddleName[];
        dateOfBirth : Date;
        phoneNumbers: IPhoneNumber[];
        emailAddresses: IEmailAddress[];
        address : IAddress[];
    }

    export interface IClient extends IContact {
        dateOfDeath : Date;
        dateOfSeparation: Date;
        dateOfDivorce: Date;
        Children : IChild[];
    }

    export interface IChild {
        id: number;
        firstName: string;
        lastNmae: string;
        middleNames : IMiddleName[];
        dateOfBirth: Date;
    }

    export interface ISolicitor extends IContact {
        practice : IPractice;
    }

    export interface IPractice{
        id : number;
        name : string;
        phone : IPhoneNumber;
        address : IAddress;
    }

    export interface IMiddleName {
        id: number;
        name: string;
    }

    export interface IEmailAddress {
        id: number;
        email: string;
        isPreferred: boolean;
    }

    export interface IPhoneNumber {
        id: number;
        countryCode: number;
        areaCode: number;
        type: string;
        isPreferred: boolean;
        number: number;
    }

    export interface IAddress{
        id: number;
        unitNumber : number;
        streetNumber : number;
        state : string;
        country : string;
        postCode : number;
        isMailing : boolean;
        isResidential : boolean;

    }
}