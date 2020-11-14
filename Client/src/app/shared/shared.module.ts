import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PostViewPipe } from './pipes/post-view.pipe';



@NgModule({
  declarations: [SpinnerComponent, PostViewPipe],
  imports: [
    CommonModule
  ],
  exports: [SpinnerComponent, PostViewPipe]
})
export class SharedModule { }
