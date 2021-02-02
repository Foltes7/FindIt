import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginUser } from 'src/app/core/userState/user-actions';
import { UserStore } from 'src/app/core/userState/user-state';
import { nicknameValidator, passwordsValidators } from '../../helpes/form-variables';
import { options } from '../../helpes/snackbar';
import { DialogData } from '../../models/DialogData';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignINComponent implements OnInit {

  public mainForm: FormGroup = new FormGroup({
    userName: new FormControl('',  nicknameValidator),
    password: new FormControl('', passwordsValidators),
  });

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<SignINComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  get userName(): AbstractControl { return this.mainForm.get('userName'); }
  get password(): AbstractControl { return this.mainForm.get('password'); }

  async signIn(): Promise<void>
  {
    const username = this.userName.value;
    const password = this.password.value;
    await this.store.dispatch(new LoginUser(username, password)).toPromise();
    if (this.store.selectSnapshot(UserStore.isLogin))
    {
      this.close();
      this.router.navigate(['/']);
      this.snackBar.open('Log in success', 'Dismiss', options);
    }else{
      this.snackBar.open('Incorrect login or password', 'Dismiss', options);
      this.mainForm.reset();
    }
  }

  close(): void
  {
    this.dialogRef.close();
  }

}
