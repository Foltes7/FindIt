import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthorizationModel } from '../models/authorizationModel';
import { AuthService } from '../services/auth.service';
import { LoginUser, LogOutUser, RegisterUser } from './user-actions';


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
    static token(state: UserState): string
    {
        return state.authorization.accessToken;
    }

    @Selector()
    static isLogin(state: UserState): boolean
    {
        return state.authorization !== undefined && state.authorization.success === true;
    }



    @Action(RegisterUser)
    async registerUser({ setState, dispatch }: StateContext<UserState>, { username, confirmPassword, pass, email }: RegisterUser)
    {
        await this.authService.register(username, pass, confirmPassword, email).toPromise();
    }

    @Action(LoginUser)
    async loginUser({ patchState, getState }: StateContext<UserState>, { username, pass }: LoginUser)
    {
        const resp = await this.authService.login(username, pass).toPromise();
        if (resp.success)
        {
            console.log(resp);
            patchState({
                authorization: resp
            });
            console.log(getState().authorization);
        }else{
            patchState({
                authorization: null
            });
        }
    }

    @Action(LogOutUser)
    async logOut({ patchState, getState }: StateContext<UserState>)
    {
        await this.authService.logout().toPromise();
        patchState({
            authorization: null
        });
    }
}
