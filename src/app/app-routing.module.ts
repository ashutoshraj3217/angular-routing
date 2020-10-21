import { NgModule } from '@angular/core'; 
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { Routes, RouterModule } from "@angular/router";
import { ServersComponent } from './servers/servers.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    {path:'',component: HomeComponent},
    {path:'users',component: UsersComponent, 
    children:[
      {path:':id/:name',component: UserComponent},  // passing parameter to routes. colon tells the angular,this is dynamic part of the path.
    ]}, 
    
    {
        path:'servers',
      //  canActivate: [AuthGuard],  // protects the current routes
        canActivateChild: [AuthGuard],  // protects the child routes
        component: ServersComponent, 
        children:[
        {path:':id',component: ServerComponent},
        {path:':id/edit',component: EditServerComponent}
    ]},
    {path:'**', redirectTo: ''},  // wild card route, must be at last.
  ];


  @NgModule({
      imports:[
    RouterModule.forRoot(appRoutes)
      ],
      exports:[RouterModule]
})

export class AppRoutingModule{}