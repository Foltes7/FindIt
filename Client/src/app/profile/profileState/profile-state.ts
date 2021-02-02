import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { GetProfile, SetBussinessAccount, SetDefaultAccount } from './profile-actions';


interface ProfileState {
    currentPageProfile: Profile;
    isExist: boolean;
    isLoaded: boolean;
}

@State<ProfileState>({
    name: 'Profile',
    defaults: {
        currentPageProfile: null,
        isExist: false,
        isLoaded: false
    }
})

@Injectable()
export class ProfileStore {

    @Selector()
    static isExist(state: ProfileState): boolean
    {
        return state.isExist;
    }

    @Selector()
    static isLoaded(state: ProfileState): boolean
    {
        return state.isLoaded;
    }

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
        patchState({isLoaded: false});
        if (username !== getState().currentPageProfile?.userName){
            const resp = await this.profileService.getProfile(username).toPromise();
            patchState({
                currentPageProfile: resp.user,
                isExist: resp.isExist,
                isLoaded: true
            });
        }
    }

    @Action(SetDefaultAccount)
    async setDefaultAccount({patchState, getState}: StateContext<ProfileState>): Promise<void>
    {
        await this.profileService.setDefaultAccount().toPromise();
        patchState({
            currentPageProfile: {...getState().currentPageProfile, isBussinessAcc: false}
        });
    }

    @Action(SetBussinessAccount)
    async setBussinessAccount({patchState, getState}: StateContext<ProfileState>): Promise<void>
    {
        await this.profileService.setBussinessAccount().toPromise();
        patchState({
            currentPageProfile: {...getState().currentPageProfile, isBussinessAcc: true}
        });
    }
}
