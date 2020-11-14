import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRouting } from './profile-routing';
import { SharedModule } from '../shared/shared.module';
import { ThingsComponent } from './thingsPage/things/things.component';
import { ThingComponent } from './thingsPage/thing/thing.component';
import { FullThingComponent } from './full-thing/full-thing.component';
import { CommentsComponent } from './full-thing-components/comments/comments.component';
import { OverviewComponent } from './full-thing-components/overview/overview.component';
import { PhotosComponent } from './full-thing-components/photos/photos.component';
import { ProfileInProfileComponent } from './profile-in-profile/profile-in-profile.component';



@NgModule({
  declarations: [ProfileComponent, ThingsComponent, ThingComponent,
    FullThingComponent, CommentsComponent, OverviewComponent, PhotosComponent, ProfileInProfileComponent],
  imports: [
    CommonModule,
    ProfileRouting,
    SharedModule
  ]
})
export class ProfileModule { }
