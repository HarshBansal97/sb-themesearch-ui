import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  baseUrl = 'http://127.0.0.1:8081'
  private employeedata = [];


  constructor(private httpClient:HttpClient) { 

  }

  get_employee_data(){
    // this.httpClient.get(this.baseUrl + '/empdata').subscribe((res:any[])=>{
    //   console.log(res);
    //   this.employeedata = res;

    // });
    // return this.employeedata;

    return this.httpClient.get(this.baseUrl + '/empdata');

  }

   
  // employeeData(){
  //   var data = [
  //     {sno:1, name:'A', id:'1'},
  //     {sno:2, name:'b', id:'12'},
  //     {sno:3, name:'c', id:'123'},
  //     {sno:4, name:'d', id:'1234'},
  //     {sno:5, name:'e', id:'12345'}
  //   ];
  //   return data;
  // }
}
