import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';
import { ShortUser } from '../models/user';


interface UserState {
    user: ShortUser;
}

@State<UserState>({
    name: 'User',
    defaults: {
        user: null,
    }
})

@Injectable()
export class UserStore {

    @Selector()
    static getUser(state: UserState): ShortUser {
        return state.user;
    }

}
