import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRouting } from './profile-routing';
import { SharedModule } from '../shared/shared.module';
import { ThingsComponent } from './thingsPage/things/things.component';
import { ThingComponent } from './thingsPage/thing/thing.component';



@NgModule({
  declarations: [ProfileComponent, ThingsComponent, ThingComponent],
  imports: [
    CommonModule,
    ProfileRouting,
    SharedModule
  ]
})
export class ProfileModule { }
