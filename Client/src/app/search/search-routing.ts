import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRouting {
}
