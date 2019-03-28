import { Observable, of } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API_URL } from './host-address';
import { UserInfo } from './user-info';

import { tap, startWith } from 'rxjs/operators';
import { ApiUrlManagement } from './api-url-management';
import { ApiResult } from '../interfaces/api-result';
import { RequestCache } from './request-cache';
import { CommonHelper } from './commonHelper';

/**
 * 需要缓存数据的接口
 */
export const cacheUrl = [
  // {
  //   url: ApiUrlManagement.NewList
  // }, {
  //   url: ApiUrlManagement.newsdetail
  // },
  // {
  //   url: ApiUrlManagement.Online,
  //   cacheTime: 50 * 1000
  // }
];

/**
 * 授权拦截器
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * http请求数
   */
  private requestCount = 0;
  /**
   *
   */
  constructor(
    @Inject(API_URL) private apiUrl,
    private userInfo: UserInfo,
    private commonhelper: CommonHelper
  ) {}
  /**
   * 序列化请求参数
   * @param obj 请求参数
   */
  param(obj) {
    let query = '',
      name,
      value,
      fullSubName,
      subName,
      subValue,
      innerObj,
      i;
    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += this.param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            if (value.hasOwnProperty(subName)) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += this.param(innerObj) + '&';
            }
          }
        } else if (value !== undefined && value !== null) {
          query +=
            encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }

  /**
   * 减去请求次数或者关闭loading
   */
  private deductRequestCount() {
    // if (this.requestCount > 1){
    //   this.requestCount--;
    // }else{
    // }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 判断是否需要loading的post请求，需要在请求前添加loading字段，loading true：不需要loading
    // if (req.method === 'POST') {
    //   if (!req.body.loading) {
    //     this.commonhelper.presentLoading();
    //   }
    //   // 删除不需要发送的loading字段
    //   delete req.body.Loading;
    // } else {
    //   this.commonhelper.presentLoading();
    // }
    const authHeader = 'Bearer ' + this.userInfo.GetToken();
    const authReq = req.clone({
      headers: req.headers
        .set('Authorization', authHeader)
        .set('Content-Type', 'application/x-www-form-urlencoded'),
      url: this.apiUrl + req.url,
      body: this.param(req.body)
    });
    // this.commonhelper.presentLoading();
    return next.handle(authReq).pipe(
      tap(
        event => {
          // 临时去除全局拦截
          // this.commonhelper.dismissLoading();
          if (event instanceof HttpResponse) {
            // this.commonhelper.dismissLoading();
            if (event.url.indexOf(ApiUrlManagement.login) <= -1) {
              const apiReustl = event.body as ApiResult<{}>;
              if (apiReustl.State === 0 && apiReustl.Message) {
                this.commonhelper.presentToast(apiReustl.Message);
              }
            }
          } else {
            // this.deductRequestCount();
          }
        },
        error => {
          if (this.commonhelper) {
            this.commonhelper.dismissLoading();
          }
          // if (error.status === 401) {
          //   // this.messageService.add({ severity: 'error', summary: '错误消息', detail: '服务器出错，请稍后再试！' });
          //   this.route.navigateByUrl('login');
          //   return false;
          // }
          // if (error.url.indexOf(ApiUrlManagement.login)) {
          //   this.toastrService.error( error.error.error_description
          //   , '错误消息');
          // } else {
          //   this.toastrService.error('服务器出错，请稍后再试！', '错误消息');
          // }
        }
      )
    );
  }
}

/**
 * 缓存拦截器
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private cache: RequestCache) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isCachable(req)) {
      return next.handle(req);
    }
    const cachedResponse = this.cache.get(req);
    if (req.headers.get('x-refresh')) {
      const results = this.sendRequest(req, next, this.cache);
      return cachedResponse ? results.pipe(startWith(cachedResponse)) : results;
    }
    return cachedResponse
      ? of(cachedResponse)
      : this.sendRequest(req, next, this.cache);
  }

  isCachable(req: HttpRequest<any>) {
    const urldata = [];
    cacheUrl.forEach(function(item) {
      urldata.push({ url: item.url });
    });
    // const  urldata = cacheUrl.filter(d => d.url)
    return req.method === 'GET' && -1 < urldata.indexOf(req.url); // -1 < req.url.indexOf('api/bdcappdata/GetNewsItem');
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache
  ): Observable<HttpEvent<any>> {
    const noHeaderReq = req.clone({ headers: new HttpHeaders() });
    return next.handle(noHeaderReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(req, event);
        }
      })
    );
  }
}
