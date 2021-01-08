import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserStore } from 'src/app/core/userState/user-state';
import { SignINComponent } from 'src/app/shared/modal_components/sign-in/sign-in.component';
import { SignUPComponent } from 'src/app/shared/modal_components/sign-up/sign-up.component';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private store: Store,
    private dialogService: DialogService,
    private router: Router, ) { }

  ngOnInit(): void {
  }

  openSignUp(): void
  {
    const config: MatDialogConfig =  {
      width: '500px',
      maxHeight: '100%',
      data: {
        title: 'Sign Up'
      },
      panelClass: 'custom-dialog-class',
      disableClose: true
    };
    this.dialogService.openDialog(SignUPComponent, config);
  }

  openSignIn(): void
  {
    const isUserLogin = this.store.selectSnapshot(UserStore.isLogin);
    if (isUserLogin)
    {
      this.router.navigate(['/']);
    }else{
      const config: MatDialogConfig =  {
        width: '500px',
        maxHeight: '100%',
        data: {
          title: 'Sign In'
        },
        panelClass: 'custom-dialog-class',
        disableClose: true
      };
      this.dialogService.openDialog(SignINComponent, config);
    }
  }
}
