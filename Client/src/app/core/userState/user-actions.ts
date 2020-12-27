

export class RegisterUser {
    static type = '[User] Register';
    constructor(public username: string, public pass: string, public confirmPassword: string, public email: string ) {}
}

export class LoginUser {
    static type = '[User] Login';
    constructor() {}
}
