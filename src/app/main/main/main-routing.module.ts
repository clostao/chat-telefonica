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
        loadChildren: () => import("../messages/messages.module").then(m => m.MessagesPageModule),
      },
      {
        path: "users",
        loadChildren: () => import("../users/users.module").then(m => m.UsersPageModule),
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
