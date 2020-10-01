import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRouting } from './profile-routing';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRouting
  ]
})
export class ProfileModule { }
