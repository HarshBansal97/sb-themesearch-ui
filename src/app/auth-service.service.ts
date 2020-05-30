import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIConstants } from './restapis';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {

  }

  authUser(username: string, password: string): any {
    var request = {
      "username": username,
      "password": password
    };
    console.log("In auth service")
    // const headers = new HttpHeaders();
    // headers.set("content-type", "application/json; charset=utf-8");
    // return this.http.post(APIConstants.LOGIN, request, { headers: headers });
    return this.http.post(APIConstants.LOGIN, request);
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
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('account_type');
    sessionStorage.removeItem('user_id');
  }
}
