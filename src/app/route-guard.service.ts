import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private authServiceService:AuthServiceService, private router : Router) { }
  canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("route", route);
    console.log("state", state);
    let userInUrl = route.params['uname']; 
    let returnBoolean: boolean;
    if(userInUrl){
      returnBoolean = this.authServiceService.isUserLogin(userInUrl);
    } else {
      returnBoolean = this.authServiceService.isUserLogin();
    }
    if(returnBoolean){
      return true;
    } else {
      this.router.navigate(['error']);
    }
  }
}
