import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { SavedComponent } from './saved/saved.component';


const routes: Routes = [
  { path: '', component: SavedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedRouting {
}
