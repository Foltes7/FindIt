

export class RegisterUser {
    static type = '[User] Register';
    constructor(public username: string, public pass: string, public confirmPassword: string, public email: string ) {}
}

export class LoginUser {
    static type = '[User] Login';
    constructor(public username: string, public pass: string) {}
}

export class RefreshToken {
    static type = '[User] Refresh token';
    constructor() {}
}

export class CheckStatusForTokenUpdating {
    static type = '[User] Update token';
    constructor() {}
}


export class LogOutUser {
    static type = '[User] Log out';
    constructor() {}
}

