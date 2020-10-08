import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRouting } from './profile-routing';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [ProfileComponent, ServicesComponent, ProductsComponent],
  imports: [
    CommonModule,
    ProfileRouting
  ]
})
export class ProfileModule { }
