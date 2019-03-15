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
  constructor(private httpclient: HttpClient) {}

  /**
   * 获取首页条数
   */
  getmainindexdata(): Observable<any> {
    return this.httpclient.get<any>(
      ApiUrlManagement.MainindexData + '?tag=oa_receive_l'
    );
  }

  /**
   * 收文待办列表数据
   * type 1 收文待办
   */
  getneedtodolist(
    page: number,
    type: number = 1,
    searchStr?: string
  ): Observable<any> {
    //收文待办
    if (type == 1) {
      return this.httpclient.post<any>(ApiUrlManagement.needtododata, {
        type: '传阅件;批办件',
        pageNumber: page,
        pageSize: 10,
        query: searchStr
      });
    }
    // 2 发文待办  3传阅件
    else {
      var url =
        type == 2
          ? ApiUrlManagement.getsendsneedtodo
          : ApiUrlManagement.getReceives_read;
      return this.httpclient.post<any>(url, {
        pageNumber: page,
        pageSize: 10,
        query: searchStr
      });
    }
  }

  /**
   * 获取已办 1-收文  2-发文
   */
  getBrowserFile(page: number, type: number) {
    var url =
      type == 1
        ? ApiUrlManagement.GetBrowsers_Receive
        : ApiUrlManagement.GetBrowsers_Send;
    return this.httpclient.post<any>(url, {
      pageNumber: page,
      pageSize: 10
    });
  }

  /**
   * 获取意见列表
   */
  getallAttitudeList(
    Id: string,
    processType: string,
    coorType: string
  ): Observable<any> {
    return this.httpclient.post(ApiUrlManagement.getAttitudeList, {
      RelationId: Id,
      ProcessType: processType,
      CoorType: coorType
    });
  }

  /**
   * 获取附件
   */
  getattchmentlist(Id: string): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.getattchmentlist + '?relationId=' + Id
    );
  }

  /**
   * 获取收文流转信息
   * @param receiveId 必填 第一次获取的时候只传receiveid
   * @param subid  之后点击子类时才用到
   */
  getReciveDetailInfo(receiveId: string, subid: string = ''): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.getReciveDetailInfo +
        '?receiveId=' +
        receiveId +
        '&ID=' +
        subid
    );
  }

  /**
   * 保存意见
   */
  saveadvice(saveadvicemodel: saveadviceModel): Observable<any> {
    return this.httpclient.post(ApiUrlManagement.saveAdvice, saveadvicemodel);
  }

  /**
   * 获取保存
   */
  getattitudeType(
    Id: string,
    processType: number,
    coorType: number
  ): Observable<any> {
    return this.httpclient.post(ApiUrlManagement.attitudeType, {
      relationId: Id,
      processType: processType,
      coorType: coorType
    });
  }

  /**
   * 获取常用语
   */
  getoftenuse(): Observable<any> {
    return this.httpclient.get(ApiUrlManagement.oftenuser + '?count=10');
  }

  /**
   * 获取弹框的类型
   */
  getToastType(
    Id: string,
    processType: number,
    coorType: number
  ): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.getToastType +
        '?id=' +
        Id +
        '&processType=' +
        processType +
        '&coorType=' +
        coorType
    );
  }

  /**
   * 获取一级部门
   */
  getDeptTreeUntilMainDept(): Observable<any> {
    return this.httpclient.get(ApiUrlManagement.getDeptTreeUntilMainDept);
  }

  /**
   * 选人后提交的接口
   */
  lasthandinStep(lasthandinmodel: lasthandinStepModel): Observable<any> {
    return this.httpclient.post(ApiUrlManagement.lasthandin, lasthandinmodel);
  }

  /**
   * 结束一条文的接口
   */
  endActionStep(Id: string, CommitType: string, NextActionId: string, ProcessType: string): Observable<any> {
    return this.httpclient.post(ApiUrlManagement.lasthandin, {
      'Id': Id,
      'CommitType': CommitType,
      'NextActionId': NextActionId,
      'ProcessType': ProcessType
    });
  }

  /**
   * 610commit拟办给多人
   */
  commit_610(Id: string, CommitType: string, ProcessType: string, coorType: string, ) {
    return this.httpclient.post(ApiUrlManagement.lasthandin, {
      'Id': Id,
      'CommitType': CommitType,
      'coorType': coorType,
      'ProcessType': ProcessType
    });
  }

  /**
   *
   */

  /**
   * 获取局领导数据
   */
  getLeaderTree(): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.getLeaderTree + '?hasSelectAll=true'
    );
  }

  /**
   * 获取部门人员
   * @param id 部门id
   */
  getDeptTreeCY(id: string): Observable<any> {
    return this.httpclient.get(ApiUrlManagement.getDeptTreeCY + '?id=' + id);
  }

  /**
   * 签收
   */
  signclick(
    Id: string,
    processType: string,
    coorType: string
  ): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.Sign +
        '?relationId=' +
        Id +
        '&processType=' +
        processType +
        '&coorType=' +
        coorType
    );
  }

  /**
   * 提交并返回给代理人
   */
  handinandbackman(Id: string): Observable<any> {
    return this.httpclient.get(ApiUrlManagement.handinandbackman + '?id=' + Id);
  }

  /**
   * 协办提交
   */
  xiebanhandin(Id: string, coorType: string): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.xiebanhandin +
        '?relationId=' +
        Id +
        '&coordination=' +
        coorType
    );
  }

  commitSimulateEnd(
    id: string,
    processType: string,
    coorType: string
  ): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.commitSimulateEnd +
        '?id=' +
        id +
        '&processType=' +
        processType +
        '&coorType=' +
        coorType
    );
  }

  /**
   *  移交请求办公室人员
   */
  GetFlow_YJ_DeptStaffTree(): Observable<any> {
    return this.httpclient.get(ApiUrlManagement.GetFlow_YJ_DeptStaffTree);
  }

  /** 移交验证 */
  ValidMove(
    id: string,
    processType: string,
    coorType: string
  ): Observable<any> {
    return this.httpclient.get(
      ApiUrlManagement.ValidMove +
        '?id=' +
        id +
        '&processType=' +
        processType +
        '&coorType=' +
        coorType
    );
  }

  MoveCommit(cmdata: string): Observable<any> {
    return this.httpclient.post(
      ApiUrlManagement.lasthandin,
      {},
      {
        params: {
          cmdata: cmdata
        }
      }
    );
  }

  /**
   * 主办下一步提交 --获取--结束
   */
  getendAction(Id: string, processType: string): Observable<any> {
    return this.httpclient.get(ApiUrlManagement.GetActionTree + '?id=' + Id + '&processType=' + processType);
  }

  /**
   * 发文--获取提交的人员
   */
  GetActionTreeSend(Id: string, processType: string) {
    return this.httpclient.get(ApiUrlManagement.GetActionTreeSend + '?id=' + Id + '&processType=' + processType);
  }

  /**
   * 发文
   */
  LastSendActionStep(lastSebdActionStepModel: LastSendActionStepModel) {
    return this.httpclient.post(ApiUrlManagement.lasthandin, lastSebdActionStepModel)
  }

  /**
  * 保密审查意见接口
  */
  SecretInfoAdvice(Id: string,secrecyOpinion: string) {
    return this.httpclient.post(ApiUrlManagement.secretInfoAdvice,{
      SecrecyOpinion: secrecyOpinion,
      Id: Id
    });
  }

  /**
   * 公开信息接口
   */
  OpenInfoAdvice(Id: string,inspectionOpinion: string) {
    return this.httpclient.post(ApiUrlManagement.secretInfoAdvice,{
      InspectionOpinion: inspectionOpinion,
      Id: Id
    });
  }

}

// 保存意见的参数模型
export interface saveadviceModel {
  relationId: string;
  processType: number;
  coorType: number;
  attitudeType: string;
  content: string;
  skipValid: boolean;
}

// 人员机构提交时的参数模型

export interface lasthandinStepModel {
  id: string;
  // 主办id 单选
  primaryDeptId: string;
  // 下一步 如果选的是部门的话就是整个部门下的所有人的id数组
  leaders: string[];

  // 协办id
  cooperaters: string[];

  // 传阅件
  readers: PendingReaderModel[];

  // 模态框
  commitType: number;

  CoorType: number;

  ProcessType: number;
}

export interface PendingReaderModel {
  // 如果传阅只是选择人的话就只有staffid有值
  staffId: string;

  // 如果选择的是整个部门的话就是部门id有值 staffId没有值
  deptId: string;
}

//发文提交参数

export interface LastSendActionStepModel {
  id: string,
  NextActionId: string,

  NextUserId: string,

  commitType: number,

  CoorType: number,

  ProcessType: number,
}
