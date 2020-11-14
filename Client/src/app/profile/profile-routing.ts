import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { ThingsComponent } from './thingsPage/things/things.component';
import { FullThingComponent } from './full-thing/full-thing.component';
import { OverviewComponent } from './full-thing-components/overview/overview.component';
import { CommentsComponent } from './full-thing-components/comments/comments.component';
import { PhotosComponent } from './full-thing-components/photos/photos.component';
import { ProfileInProfileComponent } from './profile-in-profile/profile-in-profile.component';

const childrenThing: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'photos', component: PhotosComponent }
];


const childrenProfile: Routes = [
  { path: 'things', component: ThingsComponent },
  { path: 'things/:id', component: FullThingComponent, children: childrenThing },
  { path: '', component: ProfileInProfileComponent}
];

const routes: Routes = [
  { path: ':id', component: ProfileComponent, children: childrenProfile }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {
}
