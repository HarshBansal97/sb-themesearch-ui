import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authServiceService:AuthServiceService,private route:Router) { }

  ngOnInit() {
    this.authServiceService.logoutUser();
    this.route.navigate(['']);
  }

}
