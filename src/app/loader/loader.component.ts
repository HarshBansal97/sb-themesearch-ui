import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  private subscription: Subscription;
  loading: boolean;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {
    this.subscription = this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });
  }
    
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}