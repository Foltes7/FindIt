import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [ContentComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ContentModule { }
