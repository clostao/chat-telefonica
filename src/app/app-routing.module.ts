import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'main/messages',
    loadChildren: () => import('./main/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'main/users',
    loadChildren: () => import('./main/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'main/chat',
    loadChildren: () => import('./main/chat/chat.module').then( m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
