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
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { ProfileEditingComponent } from './modal_components/profile-editing/profile-editing.component';
import { SecurityMenuPointComponent } from './modal_components/profile-editing-components/security-menu-point/security-menu-point.component';
import { ProfileMenuPointComponent } from './modal_components/profile-editing-components/profile-menu-point/profile-menu-point.component';


@NgModule({
  declarations: [SpinnerComponent, PostViewPipe, SignUPComponent, SignINComponent, ModalTitleComponent, 
    ProfileEditingComponent, SecurityMenuPointComponent, ProfileMenuPointComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatAutocompleteModule
  ],
  exports: [SpinnerComponent, PostViewPipe, FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatAutocompleteModule
  ],
  providers: [DialogService]
})
export class SharedModule { }
