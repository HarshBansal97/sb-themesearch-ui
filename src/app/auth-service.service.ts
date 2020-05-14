import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient) {

  }

  authUser(username: string, password: string): any {
    //  var request={
    //     "username":username,
    //     "password":password
    //   };

    //   console.log("In auth service")
    //   return this.httpClient.post("http://localhost:8081/authuser",request);

    if (username === 'abc' && password === 'abc') {
      return true;
    } else {
      return false;
    }
  }

  isUserLogin(userName?: string): boolean {
    if (sessionStorage.getItem('authUsername') === null) {
      return false;
    } else {
      if (userName) {
        if (userName === sessionStorage.getItem('authUsername')) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }

  nameUser(): string {
    if (this.isUserLogin()) {
      return sessionStorage.getItem('authUsername');
    } else {
      return undefined;
    }
  }
  logoutUser() {
    sessionStorage.removeItem('authUsername');
    sessionStorage.removeItem('jwt');
  }
}
