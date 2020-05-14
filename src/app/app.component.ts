import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee';
  constructor(private authServiceService: AuthServiceService, private router : Router){}

  onMenuClick(){
    this.router.navigate(['menu',this.authServiceService.nameUser()]);
  }
}
