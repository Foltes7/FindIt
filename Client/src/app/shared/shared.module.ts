import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickableComponent } from './profiles-buttons/clickable/clickable.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PostViewPipe } from './pipes/post-view.pipe';



@NgModule({
  declarations: [ClickableComponent, SpinnerComponent, PostViewPipe],
  imports: [
    CommonModule
  ],
  exports: [ClickableComponent, SpinnerComponent, PostViewPipe]
})
export class SharedModule { }
