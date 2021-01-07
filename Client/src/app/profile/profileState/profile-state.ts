import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { GetProfile, SetBussinessAccount, SetDefaultAccount } from './profile-actions';


interface ProfileState {
    currentPageProfile: Profile;
}

@State<ProfileState>({
    name: 'Profile',
    defaults: {
        currentPageProfile: null,
    }
})

@Injectable()
export class ProfileStore {

    @Selector()
    static currentPageProfile(state: ProfileState): Profile
    {
        return state.currentPageProfile;
    }

    constructor(private profileService: ProfileService) {

    }

    @Action(GetProfile)
    async getProfile({patchState, getState}: StateContext<ProfileState>, {username}: GetProfile): Promise<void>
    {
        if (username !== getState().currentPageProfile?.userName){
            const user = await this.profileService.getProfile(username).toPromise();
            patchState({
                currentPageProfile: user
            });
        }
    }

    @Action(SetDefaultAccount)
    async setDefaultAccount({patchState, getState}: StateContext<ProfileState>)
    {
        await this.profileService.setDefaultAccount().toPromise();
        patchState({
            currentPageProfile: {...getState().currentPageProfile, isBussinessAcc: false}
        });
    }

    @Action(SetBussinessAccount)
    async setBussinessAccount({patchState, getState}: StateContext<ProfileState>)
    {
        await this.profileService.setBussinessAccount().toPromise();
        patchState({
            currentPageProfile: {...getState().currentPageProfile, isBussinessAcc: true}
        });
    }
}
