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
  errorMessage: string="";
  validate: boolean;
  constructor(private route: Router,private authServiceService:AuthServiceService) { }

  ngOnInit() {
  }

  validateLogin(){
    this.authServiceService.authUser(this.username,this.password).subscribe(res=>{
      console.log('authUser response ',res.message, ' at time ', new Date());
      if(res.message === 'Successfully logged in' && res.status_code === 201 ){
        console.log('In success');
        sessionStorage.setItem('authUsername',this.username);
        sessionStorage.setItem('token',res.token);
        sessionStorage.setItem('account_type',res.account_type);
        sessionStorage.setItem('user_id',res.user_id);
        this.route.navigate(['home']);
      } else {
        console.log('NOT SUCCESSFUL, ', res);
      }
    }, (error) => {
      console.log('authUser error ', error, ' at time ', new Date());
    });

    // this.validate = this.authServiceService.authUser(this.username,this.password);
    // if (this.validate) {
    //   sessionStorage.setItem('authUsername', this.username);
    //   sessionStorage.setItem('jwt','jwtjwtjwt');
    //   this.route.navigate(['home']);
    // }
  }

}
