import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRouting } from './home-routing';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRouting
  ]
})
export class HomeModule { }
