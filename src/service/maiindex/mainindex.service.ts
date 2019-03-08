import { ApiResult } from './../../interfaces/api-result';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlManagement } from 'src/infrastructure/api-url-management';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

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
  getBrowserFile(page:number,type: number) {
    var url = type == 1 ? ApiUrlManagement.GetBrowsers_Receive : ApiUrlManagement.GetBrowsers_Send;
    return this.httpclient.post<any>(url, {
      'pageNumber': page,
      'pageSize': 10
    });
  }

  /**
   * 获取意见列表
   */
  getallAttitudeList(Id:string, processType:string, coorType:string): Observable<ApiResult<{}>> {
    return this.httpclient.post(ApiUrlManagement.getAttitudeList,{
      'RelationId': Id,
      'ProcessType': processType,
      'CoorType': coorType
    })
  }

  /**
   * 获取附件
   */
  getattchmentlist(Id: string) : Observable<any> {
    return this.httpclient.get(ApiUrlManagement.getattchmentlist + '?relationId=' + Id);
  }

  /**
   * 获取收文流转信息
   * @param receiveId 必填 第一次获取的时候只传receiveid
   * @param subid  之后点击子类时才用到
   */
  getReciveDetailInfo(receiveId: string, subid: string = ''): Observable<any> {
    return this.httpclient.get(ApiUrlManagement.getReciveDetailInfo + '?receiveId=' + receiveId + '&ID=' + subid);
  }

}
