import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';
import { AuthorizationModel } from '../models/authorizationModel';


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

    @Selector()
    static getUser(state: UserState): AuthorizationModel {
        return state.authorization;
    }

}
