import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APIConstants } from './restapis';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public getVerse(data): Observable<any> {
    let verse_id = data['canto']+'.'+data['chapter']+'.'+data['verse'];
    console.log('GET Verse:', verse_id);

    let params = new HttpParams();
    params = params.set('verse_id', verse_id);
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    return this.http.post(APIConstants.GETVERSE, params, { headers });
  }

}
