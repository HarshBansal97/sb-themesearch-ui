import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APIConstants } from './restapis';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public getVerse(data, dir): Observable<any> {
    let verse_id = data['canto'] + '.' + data['chapter'] + '.' + data['verse'];
    console.log('GET Verse:', verse_id);

    let params = new HttpParams();
    params = params.set('verse_id', verse_id);
    
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    if (dir == 0) return this.http.get(APIConstants.VERSE, { headers: headers, params: params });
    else if (dir == 1) return this.http.get(APIConstants.NVERSE, { headers: headers, params: params });
    else if (dir == -1) return this.http.get(APIConstants.PVERSE, { headers: headers, params: params });
    return ;
  }

  public getTranslationTags(verse_id): Observable<any> {
    console.log('GET Translation Tags:', verse_id);
    let params = new HttpParams();
    params = params.set('verse_id', verse_id);
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    return this.http.get(APIConstants.TRANSLATIONTAGS, { headers: headers, params: params });
  }

  public getPurportSectionTags(verse_id): Observable<any> {
    console.log('GET Purport Section Tags:', verse_id);
    let params = new HttpParams();
    params = params.set('verse_id', verse_id);
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    return this.http.get(APIConstants.PURPORTSECTIONTAGS, { headers: headers, params: params });
  }

  public postTranslationTags(data) {
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    return this.http.post(APIConstants.TRANSLATIONTAGS, data, { headers: headers });
  }

  public postPurportSectionTags(data) {
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    return this.http.post(APIConstants.PURPORTSECTIONTAGS, data, { headers: headers });
  }

  public addRemarkTranslationTag(data) {
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    return this.http.post(APIConstants.TRANSLATIONTAGS, data, { headers: headers });
  }

  public addRemarkPurportSectionTag(data) {
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    return this.http.post(APIConstants.PURPORTSECTIONTAGS, data, { headers: headers });
  }

  public deleteTranslationTag(tag_id) {
    return this.http.delete(APIConstants.TRANSLATIONTAGS+'/'+tag_id+'/');
  }

  public deletePurportSectionTag(tag_id) {
    return this.http.delete(APIConstants.PURPORTSECTIONTAGS+'/'+tag_id+'/');
  }

  public approveTranslationTag(tag_id, data) {
    return this.http.put(APIConstants.TRANSLATIONTAGS+'/'+tag_id+'/', data);
  }

  public approvePurportSectionTag(tag_id, data) {
    return this.http.put(APIConstants.PURPORTSECTIONTAGS+'/'+tag_id+'/', data);
  }
  // public createVerse(data): Observable<any> {
  //   const headers = new HttpHeaders();
  //   headers.set("content-type", "application/json; charset=utf-8");
  //   return this.http.post(APIConstants.CREATEVERSE, data, { headers: headers });
  // }
}
