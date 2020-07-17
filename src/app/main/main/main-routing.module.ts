import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path : "",
        redirectTo : "messages"
      },
      {
        path: "messages",
        loadChildren: "../messages/messages.module#MessagesPageModule",
      },
      {
        path: "users",
        loadChildren: "../users/users.module#UsersPageModule",
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
