import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';

const childrenRoutes: Routes = [
  {path: '', component: ServicesComponent},
  {path: 'products', component: ProductsComponent},
];

const routes: Routes = [
  { path: '', component: ProfileComponent, children: childrenRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {
}
