import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        loadChildren: () => import('./saved/saved.module').then(m => m.SavedModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
      },
      {
        path: 'profile/:id',
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
