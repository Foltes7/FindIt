import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickableComponent } from './profiles-buttons/clickable/clickable.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [ClickableComponent, SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [ClickableComponent, SpinnerComponent]
})
export class SharedModule { }
