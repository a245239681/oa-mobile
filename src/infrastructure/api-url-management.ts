
//API Url统一管理数组
export const ApiUrlManagement = {

  /**
   * 登录接口
   */
  login: 'api/oa/GetTokenData',

  /**
   * 首页数据接口
   */
  MainindexData: 'api/recieve/GetWidgetData',

  /**
   * 获取收文待办数据列表
   */
  needtododata: 'api/recieve/GetRecieveData',

  /**
   * 获取发文待办
   */
  getsendsneedtodo: 'api/recieve/GetSends',

  /**
   * 获取传阅件
   */
  getReceives_read: 'api/recieve/GetReceives_Read',

  /**
   * 收文 已办
   */
  GetBrowsers_Receive: 'api/recieve/GetBrowsers_Receive',

  /**
   * 发文已办
   */
  GetBrowsers_Send: 'api/recieve/GetBrowsers_Send',

  /**
   * 获取意见
   */
  getAttitudeList: 'api/recieve/GetAttitudeList',


  /**
   * 附件列表
   */
  getattchmentlist: 'api/recieve/GetAttachmentList',

  /**
   * 收文流转信息
   */
  getReciveDetailInfo: 'api/recieve/Receive_ActDetailTree',

  /**
   * 获取一级部门
   */
  getDeptTreeUntilMainDept: 'api/recieve/GetDeptTreeUntilMainDept',

}




