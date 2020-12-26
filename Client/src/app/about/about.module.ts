import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRouting } from './about-routing';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRouting,
    SharedModule
  ],
  providers: []
})
export class AboutModule { }
