import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { Page404Routing } from './page404-routing';



@NgModule({
  declarations: [Page404Component],
  imports: [
    CommonModule,
    Page404Routing
  ]
})
export class Page404Module { }
