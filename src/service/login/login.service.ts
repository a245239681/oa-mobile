import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient:HttpClient) { }


/**
 * 登录接口
 * @param loginmodel 登录相关参数 用户名 密码
 */ 
 login(loginmodel : loginModel) : Observable<any> {
    return this.httpclient.post<any>(ApiUrlManagement.login,loginmodel);
  }
}


export interface loginModel {

  username: string,

  PassWord: string,
}