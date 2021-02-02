import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { passwordsMatchValidator, passwordsValidators } from 'src/app/shared/helpes/form-variables';

@Component({
  selector: 'app-security-menu-point',
  templateUrl: './security-menu-point.component.html',
  styleUrls: ['./security-menu-point.component.scss']
})
export class SecurityMenuPointComponent implements OnInit {

  public mainForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', passwordsValidators),
    newPassword: new FormControl('', passwordsValidators),
    confirmPassword: new FormControl('', passwordsValidators),
  }, (form) => passwordsMatchValidator(form, 'newPassword', 'confirmPassword'));

  get oldPassword(): AbstractControl { return this.mainForm.get('oldPassword'); }
  get newPassword(): AbstractControl { return this.mainForm.get('newPassword'); }
  get confirmPassword(): AbstractControl { return this.mainForm.get('confirmPassword'); }


  constructor() { }

  ngOnInit(): void {

  }

}
