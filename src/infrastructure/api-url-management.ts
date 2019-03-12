
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
   * 保存意见
   */
  saveAdvice: 'api/recieve/SaveAttitude',

  /**
   * 获取保存意见时需要填的参数的attitudeType
   */
  attitudeType: 'api/recieve/Open',

  /**
   * 常用语
   */
  oftenuser: 'api/recieve/DailyMaxList',

  /**
   * 获取一级部门
   */
  getDeptTreeUntilMainDept: 'api/recieve/GetDeptTreeUntilMainDept',

  /**
   * 获取拟办部门及其人员
   */
  getreader: 'api/recieve/GetDeptTree_CY',

  /**
   * 点击提交返回给一个弹框的类型
   */
  getToastType: 'api/recieve/validnext',

  /**
   * 最后一步 人员机构的提交按钮
   */
  lasthandin: 'api/recieve/commit',

  /**
   * 获取局领导数据
   */
  getLeaderTree: 'api/recieve/GetLeaderTree',

  /**
   * 获取部门人员数据
   */
  getDeptTreeCY: 'api/recieve/GetDeptTree_CY',

}




