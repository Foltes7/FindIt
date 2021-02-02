import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LogOutUser } from 'src/app/core/userState/user-actions';
import { options } from 'src/app/shared/helpes/snackbar';
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
  constructor(
              private store: Store,
              private router: Router,
              private authService: AuthService,
              private dialogService: DialogService,
              private snackBar: MatSnackBar) { }


  ngOnInit(): void {

  }

  async logOut(): Promise<void>
  {
    await this.authService.logout().toPromise();
    await this.store.dispatch(new LogOutUser()).toPromise();
    this.router.navigate(['/about']);
    this.snackBar.open('Log out success', 'Dismiss', options);
  }

  async setBussinessAccount($event): Promise<void>
  {
    await this.store.dispatch(SetBussinessAccount).toPromise();
    this.snackBar.open('Bussiness account was seted', 'Dismiss', options);
  }

  async setDefaultAccount(): Promise<void>
  {
    await this.store.dispatch(SetDefaultAccount).toPromise();
    this.snackBar.open('Default account was seted', 'Dismiss', options);
  }

  openProfileEditing(): void
  {
    const config: MatDialogConfig =  {
      width: '950px',
      height: '72%',
      maxHeight: '100%',
      data: {
        title: 'Profile editing'
      },
      panelClass: 'custom-dialog-class',
      disableClose: true,
      autoFocus: true,
      restoreFocus: false
    };
    this.dialogService.openDialog(ProfileEditingComponent, config);
  }
}
