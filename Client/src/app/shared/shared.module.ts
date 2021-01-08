import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PostViewPipe } from './pipes/post-view.pipe';
import { SignUPComponent } from './modal_components/sign-up/sign-up.component';
import { SignINComponent } from './modal_components/sign-in/sign-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './services/dialog.service';
import { ModalTitleComponent } from './modal_components/modal-title/modal-title.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ProfileEditingComponent } from './modal_components/profile-editing/profile-editing.component';

@NgModule({
  declarations: [SpinnerComponent, PostViewPipe, SignUPComponent, SignINComponent, ModalTitleComponent, ProfileEditingComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule
  ],
  exports: [SpinnerComponent, PostViewPipe, FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule
  ],
  providers: [DialogService]
})
export class SharedModule { }
