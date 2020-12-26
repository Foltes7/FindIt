import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { SignINComponent } from 'src/app/shared/modal_components/sign-in/sign-in.component';
import { SignUPComponent } from 'src/app/shared/modal_components/sign-up/sign-up.component';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

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
      // hasBackdrop: false
    };
    this.dialogService.openDialog(SignUPComponent, config);
  }

  openSignIn(): void
  {
    const config: MatDialogConfig =  {
      width: '500px',
      maxHeight: '100%',
      data: {
        title: 'Sign In'
      },
      panelClass: 'custom-dialog-class',
      hasBackdrop: false
    };
    this.dialogService.openDialog(SignINComponent, config);
  }
}
