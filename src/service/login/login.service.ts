import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient:HttpClient) { }

  login(username:String, password:String) : Observable<any> {
    return this.httpclient.post<any>(ApiUrlManagement.login,{
      'username': username,
      'PassWord': password
    });
  }
}
