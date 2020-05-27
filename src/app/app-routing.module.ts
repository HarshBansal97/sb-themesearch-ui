import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AppComponent} from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './route-guard.service';

const routes: Routes = [
 {path: "", component: LoginComponent},
 //{path: "menu/:uname", component: MenuComponent,canActivate:[RouteGuardService]},
 {path: "home", component: MenuComponent,canActivate:[RouteGuardService]},
 {path: "logout", component: LogoutComponent,canActivate:[RouteGuardService]},
 {path: "error", component:ErrorComponent},
 {path: "**", component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
