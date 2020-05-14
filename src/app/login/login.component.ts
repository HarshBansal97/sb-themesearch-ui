import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string="Username or Password is not valid";
  validate:boolean = true;
  constructor(private route: Router,private authServiceService:AuthServiceService) { }

  ngOnInit() {
  }

  validateLogin(){
    this.validate = this.authServiceService.authUser(this.username,this.password);
    if (this.validate) {
      sessionStorage.setItem('authUsername', this.username);
      sessionStorage.setItem('jwt','jwtjwtjwt');
      this.route.navigate(['menu',this.username]);
    }
  }

}
