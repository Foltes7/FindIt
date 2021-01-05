import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthorizationModel } from '../models/authorizationModel';
import { AuthService } from '../services/auth.service';
import { LoginUser, RegisterUser } from './user-actions';


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

    @Action(LoginUser)
    async loginUser({ patchState }: StateContext<UserState>, { username, pass }: LoginUser)
    {
        const resp = await this.authService.login(username, pass).toPromise();
        if (resp.success)
        {
            patchState({
                authorization: resp
            });
        }else{
            patchState({
                authorization: null
            });
        }
    }
}
