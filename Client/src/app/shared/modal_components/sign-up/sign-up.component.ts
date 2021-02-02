import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginUser, RegisterUser } from 'src/app/core/userState/user-actions';
import { passwordsMatchValidator, passwordsValidators, nicknameValidator } from '../../helpes/form-variables';
import { DialogData } from '../../models/DialogData';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
             public dialogRef: MatDialogRef<SignUPComponent>,
             @Inject(MAT_DIALOG_DATA) public data: DialogData,
             private authService: AuthService,
             private store: Store,
             private router: Router, ) { }

  destroy = new Subject<void>();



  public mainForm: FormGroup = new FormGroup({
    userName: new FormControl('',  nicknameValidator),
    password: new FormControl('', passwordsValidators),
    confirmPassword: new FormControl('', passwordsValidators),
    email: new FormControl('', [Validators.required, Validators.email]),
  }, (form) => passwordsMatchValidator(form, 'password', 'confirmPassword'));

  ngAfterViewInit(): void {

  }


  ngOnInit(): void {
    setTimeout(() => this.userNameValidate());
  }


  userNameValidate(): void
  {
    const emailControl = this.mainForm.get('userName');
    emailControl.valueChanges.pipe(debounceTime(700))
    .pipe(takeUntil(this.destroy))
    .subscribe(
        async (value) => await this.userNameValidateHander(emailControl)
    );
  }

  async userNameValidateHander(control: AbstractControl): Promise<void> {
    const userName = control.value;
    if (userName.length >= 4)
    {
      const resp = await this.authService.validateUserNameQuery(userName).toPromise();
      if (!resp.valid)
      {
        control.setErrors({username: true});
      }else{
        control.setErrors(null);
      }
    }
  }

  get userName(): AbstractControl { return this.mainForm.get('userName'); }
  get email(): AbstractControl { return this.mainForm.get('email'); }
  get password(): AbstractControl { return this.mainForm.get('password'); }
  get confirmPass(): AbstractControl { return this.mainForm.get('confirmPassword'); }

  async signUp(): Promise<void>
  {
    const username = this.userName.value;
    const password = this.password.value;
    const confirm = this.password.value;
    const email = this.email.value;
    const resp = await this.authService.validateUserNameQuery(username).toPromise();
    if (resp)
    {
      await this.store.dispatch(new RegisterUser(username, password, confirm, email)).toPromise();
      await this.store.dispatch(new LoginUser(username, password)).toPromise();
      this.close();
      this.router.navigate(['/']);
    }else{
      this.userName.setErrors({username: true});
    }
  }

  close(): void
  {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
