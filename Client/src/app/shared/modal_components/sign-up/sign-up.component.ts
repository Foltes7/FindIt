import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterUser } from 'src/app/core/userState/user-actions';
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
             private store: Store) { }

  destroy = new Subject<void>();



  public mainForm: FormGroup = new FormGroup({
    userName: new FormControl('',  [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  }, this.passwordsMatchValidator);

  ngAfterViewInit(): void {

  }


  ngOnInit(): void {
    setTimeout(() => this.userNameValidate());
  }

  private passwordsMatchValidator(form: FormGroup) {
    if (form.get('password') && form.get('confirmPassword')) {
        return form.get('password').value === form.get('confirmPassword').value ? null : { mismatch: true };
    }
    return null;
}

  userNameValidate()
  {
    const emailControl = this.mainForm.get('userName');
    emailControl.valueChanges.pipe(debounceTime(700))
    .pipe(takeUntil(this.destroy))
    .subscribe(
        async (value) => await this.userNameValidateHander(emailControl)
    );
  }

  async userNameValidateHander(control: AbstractControl) {
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

  get userName() { return this.mainForm.get('userName'); }

  get email() { return this.mainForm.get('email'); }
  get password() { return this.mainForm.get('password'); }
  get confirmPass() { return this.mainForm.get('confirmPassword'); }

  async signUp()
  {
    const username = this.userName.value;
    const password = this.password.value;
    const confirm = this.password.value;
    const email = this.email.value;
    const resp = await this.authService.validateUserNameQuery(username).toPromise();
    if (resp)
    {
      this.store.dispatch(new RegisterUser(username, password, confirm, email));
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
