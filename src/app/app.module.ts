import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EmployeeDataService } from './employee-data.service';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddTagComponent } from './add-tag/add-tag.component';
import {NgModule} from '@angular/core';
import { DemoMaterialModule } from '../material-module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    AddTagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AddTagComponent
  ],

  providers: [ 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
