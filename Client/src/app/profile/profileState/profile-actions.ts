

export class GetProfile {
    static type = '[Profile] get';
    constructor(public username: string) {}
}

export class SetBussinessAccount {
    static type = '[Profile] SetBussinessAccount';
    constructor() {}
}

export class SetDefaultAccount {
    static type = '[Profile] SetDefaultAccount';
    constructor() {}
}
