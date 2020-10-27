import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ContentComponent } from './content/content/content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'saved',
        loadChildren: () => import('./saved/saved.module').then(m => m.SavedModule),
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
    ]
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: '**',
    loadChildren: () => import('./page404/page404.module').then(m => m.Page404Module)
  },

];

//  {preloadingStrategy: PreloadAllModules}
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
