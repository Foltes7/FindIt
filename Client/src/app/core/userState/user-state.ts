import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { interval, Subscription } from 'rxjs';
import { AuthorizationModel } from '../models/authorizationModel';
import { AuthService } from '../services/auth.service';
import { LoginUser, LogOutUser, RefreshToken, RegisterUser, CheckStatusForTokenUpdating } from './user-actions';


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

    refreshInterval = interval(1 * 60 * 1000);

    subscribe: Subscription;

    constructor(
        private authService: AuthService,
        ) {

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

    @Action(CheckStatusForTokenUpdating)
    updateToken({ getState, dispatch }: StateContext<UserState>)
    {
        const flag = getState().authorization !== undefined && getState().authorization.success === true;
        if (flag && (!this.subscribe || this.subscribe.closed)){
            dispatch(new RefreshToken());
            this.subscribe = this.refreshInterval.subscribe(() => dispatch(new RefreshToken()));
        }
    }


    @Action(RefreshToken)
    async refreshToken({ getState, patchState }: StateContext<UserState>)
    {
        const token = getState().authorization.refreshToken;
        const resp = await this.authService.refreshToken(token).toPromise();
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

    @Action(LoginUser)
    async loginUser({ patchState, getState, dispatch }: StateContext<UserState>, { username, pass }: LoginUser)
    {
        const resp = await this.authService.login(username, pass).toPromise();
        if (resp.success)
        {
            patchState({
                authorization: resp
            });
            dispatch(CheckStatusForTokenUpdating);
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
        this.subscribe?.unsubscribe();
        patchState({
            authorization: null
        });
    }
}
