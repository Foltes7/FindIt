import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedComponent } from './saved/saved.component';
import { SavedRouting } from './saved-routing';



@NgModule({
  declarations: [SavedComponent],
  imports: [
    CommonModule,
    SavedRouting
  ]
})
export class SavedModule { }
