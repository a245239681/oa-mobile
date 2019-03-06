import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlManagement } from 'src/infrastructure/api-url-management';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainindexService {

  constructor(private httpclient: HttpClient) { }

  /**
   * 获取首页条数
   */
  getmainindexdata(): Observable<any> {
    return this.httpclient.get<any>(ApiUrlManagement.MainindexData + '?tag=oa_receive_l');
  }

  /**
   * 收文待办列表数据
   */
  getneedtodolist(page: number): Observable<any> {
    return this.httpclient.post<any>(ApiUrlManagement.needtododata,{
      'type': '传阅件;批办件',
      'pageNumber': page,
      'pageSize': 10
    });
  }
}
