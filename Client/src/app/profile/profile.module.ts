import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRouting } from './profile-routing';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProfileComponent, ServicesComponent, ProductsComponent],
  imports: [
    CommonModule,
    ProfileRouting,
    SharedModule
  ]
})
export class ProfileModule { }
