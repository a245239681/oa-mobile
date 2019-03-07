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
   * type 1 收文待办
   */
  getneedtodolist(page: number, type: number = 1): Observable<any> {
    //收文待办
    if (type == 1) {
      return this.httpclient.post<any>(ApiUrlManagement.needtododata, {
        'type': '传阅件;批办件',
        'pageNumber': page,
        'pageSize': 10
      });
    }
    // 2 发文待办  3传阅件
    else {
      var url = type == 2 ? ApiUrlManagement.getsendsneedtodo : ApiUrlManagement.getReceives_read;
      return this.httpclient.post<any>(url, {
        'pageNumber': page,
        'pageSize': 10
      });
    }
  }

  /**
   * 获取已办 1-收文  2-发文 
   */
  getBrowserFile(type: number,page:number) {
    var url = type == 1 ? ApiUrlManagement.GetBrowsers_Receive : ApiUrlManagement.GetBrowsers_Send;
    return this.httpclient.post<any>(url, {
      'pageNumber': page,
      'pageSize': 10
    });
  }

}
