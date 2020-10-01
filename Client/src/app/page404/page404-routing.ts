import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { Page404Component } from './page404/page404.component';


const routes: Routes = [
  { path: '', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Page404Routing {
}
