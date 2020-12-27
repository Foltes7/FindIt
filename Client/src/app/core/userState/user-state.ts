import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthorizationModel } from '../models/authorizationModel';
import { AuthService } from '../services/auth.service';
import { RegisterUser } from './user-actions';


interface UserState {
    authorization: AuthorizationModel;
}

@State<UserState>({
    name: 'User',
    defaults: {
        authorization: null,
    }
})

@Injectable()
export class UserStore {


    constructor(private authService: AuthService) {

    }
    @Selector()
    static getUser(state: UserState): AuthorizationModel {
        return state.authorization;
    }


    @Action(RegisterUser)
    async registerUser({ setState, dispatch }: StateContext<UserState>, { username, confirmPassword, pass, email }: RegisterUser)
    {
        const register = await this.authService.register(username, pass, confirmPassword, email).toPromise();
    }
}
