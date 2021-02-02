import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordsMatchValidator, passwordsValidators } from 'src/app/shared/helpes/form-variables';

@Component({
  selector: 'app-security-menu-point',
  templateUrl: './security-menu-point.component.html',
  styleUrls: ['./security-menu-point.component.scss']
})
export class SecurityMenuPointComponent implements OnInit, OnDestroy {

  @Output()
  closeWindow = new EventEmitter();

  destroy = new Subject<void>();

  public mainForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', passwordsValidators),
    newPassword: new FormControl('', passwordsValidators),
    confirmPassword: new FormControl('', passwordsValidators),
  }, (form) => passwordsMatchValidator(form, 'newPassword', 'confirmPassword'));

  get oldPassword(): AbstractControl { return this.mainForm.get('oldPassword'); }
  get newPassword(): AbstractControl { return this.mainForm.get('newPassword'); }
  get confirmPassword(): AbstractControl { return this.mainForm.get('confirmPassword'); }


  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {

  }

  async changePassword($event): Promise<void>
  {
    const oldPassword = this.oldPassword.value;
    const newPassword = this.newPassword.value;
    const confirmPassword = this.confirmPassword.value;
    const resp = await this.authService.changePassword(oldPassword, newPassword, confirmPassword).toPromise();
    if (resp.success)
    {
      this.closeWindow.emit();
    }else{
      if (resp.message === 'Incorrect password')
      {
        console.log('incr'); // TODO HANDLER PASSWORD ERROR
      }
    }
  }

}
