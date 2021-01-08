import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LogOutUser } from 'src/app/core/userState/user-actions';
import { ProfileEditingComponent } from 'src/app/shared/modal_components/profile-editing/profile-editing.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UnsplashService } from 'src/app/shared/unsplash.service';
import { Profile } from '../models/profile';
import { SetBussinessAccount, SetDefaultAccount } from '../profileState/profile-actions';
import { ProfileStore } from '../profileState/profile-state';

@Component({
  selector: 'app-profile-in-profile',
  templateUrl: './profile-in-profile.component.html',
  styleUrls: ['./profile-in-profile.component.scss']
})
export class ProfileInProfileComponent implements OnInit {

  @Select(ProfileStore.currentPageProfile)
  public profile$: Observable<Profile>;

  followed = false;
  user: any;
  constructor(private unsplashService: UnsplashService,
              private store: Store,
              private router: Router,
              private authService: AuthService, 
              private dialogService: DialogService,) { }


  ngOnInit(): void {
    // this.unsplashService.getProfile().subscribe(x => this.user = x.user);
  }

  async logOut(): Promise<void>
  {
    await this.authService.logout().toPromise();
    await this.store.dispatch(new LogOutUser()).toPromise();
    this.router.navigate(['/about']);
  }

  setBussinessAccount($event): void
  {
    this.store.dispatch(SetBussinessAccount);
  }

  setDefaultAccount(): void
  {
    this.store.dispatch(SetDefaultAccount);
  }

  openProfileEditing()
  {
    const config: MatDialogConfig =  {
      width: '950px',
      height: '85%',
      maxHeight: '100%',
      data: {
        title: 'Profile editing'
      },
      panelClass: 'custom-dialog-class',
      disableClose: true
    };
    this.dialogService.openDialog(ProfileEditingComponent, config);
  }
}
