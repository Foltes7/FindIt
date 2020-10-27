import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { ThingsComponent } from './thingsPage/things/things.component';

const childrenProfile: Routes = [
  {path: 'things', component: ThingsComponent},
];

const routes: Routes = [
  { path: ':id', redirectTo: '/profile/:id/things', pathMatch: 'full' },
  { path: ':id', component: ProfileComponent, children: childrenProfile}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {
}
