import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/DialogData';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignINComponent implements OnInit {

  public mainForm: FormGroup = new FormGroup({
    userName: new FormControl('',  [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),
  });

  constructor(
    public dialogRef: MatDialogRef<SignINComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
  }

  get userName() { return this.mainForm.get('userName'); }
  get password() { return this.mainForm.get('password'); }

  async signIn()
  {
    const username = this.userName.value;
    const password = this.password.value;
  }

  close(): void
  {
    this.dialogRef.close();
  }

}
