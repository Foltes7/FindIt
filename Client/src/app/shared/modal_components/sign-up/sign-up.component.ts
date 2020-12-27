import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogData } from '../../models/DialogData';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private authService: AuthService) { }

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
    emailControl.valueChanges.pipe(debounceTime(3000))
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

  signUp(): void
  {
    console.log(5);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
