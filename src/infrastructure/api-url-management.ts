// API Url统一管理数组
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

  /**
   * 签收
   */
  Sign: 'api/recieve/Sign',

  /**
   * 意见页面的提交并返回代理人 --是领导的话
   */
  handinandbackman: 'api/recieve/ValidCommitLeaderCoordintion',

  /**
   * 协办提交
   */
  xiebanhandin: 'api/recieve/Commit_BMCL',

  /** 获取已勾选
   */
  commitSimulateEnd: 'api/recieve/CommitSimulateEnd',

  /**
   * 主办下一步提交---获取----结束
   */
  GetActionTree: 'api/recieve/GetActionTree',
  /**
   * 移交请求办公室人员
   */
  GetFlow_YJ_DeptStaffTree: 'api/recieve/GetFlow_YJ_DeptStaffTree',
  /**
   * 移交验证
   */
  ValidMove: 'api/recieve/ValidMove',

  /**
   * api/recieve/GetActionTreeSend
   */
  GetActionTreeSend: 'api/recieve/GetActionTreeSend',

  /**
   * 保密审查意见
   */
  secretInfoAdvice: 'api/recieve/SaveSend',

  /**
   * 退回树
   */
  getBackActionTree: 'api/recieve/GetBackActionTree',

  /** 获取办发文信息 */
  GetSendModelById: 'api/recieve/GetSendModelById',
  /**
   * 退回验证
   * */
  ValidBack: 'api/recieve/ValidBack',

  /** 验证局领导承办 */
  ValidLeader2Leader: 'api/recieve/ValidLeader2Leader',
  /** 发文的流转信息 */
  Send_ActDetailTree: 'api/recieve/Send_ActDetailTree',
  /** 会签提交 */
  commit: 'api/recieve/commit',

  /** 修改密码 */
  UpdateStaffInfo: 'api/recieve/UpdateStaffInfo',
  /**
   * 正文
   */
  fileViewSends: 'api/send/SendStemetFliePdf',
  /** 删除常用语 */
  DailyDelete: 'api/recieve/DailyDelete',
  /** 添加编辑常用语 */
  DailySave: 'api/recieve/DailySave ',

  /** 请求个人信息详情 */
  GetStaffInfo: 'api/recieve/GetStaffInfo'
};
