import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PostViewPipe } from './pipes/post-view.pipe';
import { SignUPComponent } from './modal_components/sign-up/sign-up.component';
import { SignINComponent } from './modal_components/sign-in/sign-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './services/dialog.service';



@NgModule({
  declarations: [SpinnerComponent, PostViewPipe, SignUPComponent, SignINComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [SpinnerComponent, PostViewPipe],
  providers: [DialogService]
})
export class SharedModule { }
