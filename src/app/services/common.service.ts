import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NameValuePair } from '../interfaces/nameValuePair';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  
  getGenders():Observable<NameValuePair[]>{
    return this.http.get<NameValuePair[]>('./assets/data/genders.json');
  }
}
