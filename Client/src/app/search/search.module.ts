import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchRouting } from './search-routing';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRouting
  ]
})
export class SearchModule { }
