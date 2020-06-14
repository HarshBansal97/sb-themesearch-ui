import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employee';
  constructor(public authServiceService: AuthServiceService, private router : Router, public gb: Globals){}

  ngOnInit() {
    this.gb.username = sessionStorage.getItem('authUsername');
  }

  onMenuClick(){
    this.router.navigate(['home']);
  }
}
