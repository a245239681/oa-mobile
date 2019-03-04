import { Injectable } from '@angular/core';

// 获取/设置当前登录用户信息类
@Injectable()
export class UserInfo {
  constructor() { }

 /**
  * 保存账号证件号
  * @param value  保存的账号
   * 
   *
  * @param key   键
  */
  SetPersonNo(value: string, key?: string) {
    sessionStorage.setItem(key || 'personNo', value);
  }



  /**
   *  获取账号证件号
   * @param key 账号的key
   * 
   * return  string 返回对应键的账号
   */
  GetPersonNo(key?: string): string {
    return sessionStorage.getItem(key || 'personNo') ;
  }

/**
 * 保存账号是否是线下实名情况
 * @param value  账号是否是线下实名
 * @param key  对应的键
 */
  SaveHumanReadName(value: boolean, key?: string) {
    sessionStorage.setItem(key || 'IsHumanReadName', value.toString());
  }

  /**
   * 获取账号线下实名情况 
   * @param key 对应的键
   * 
   * return  bool 返回账号线下实名的情况
   */
  CheckIsHumanReadName(key?: string): boolean {
    return !!sessionStorage.getItem(key || 'IsHumanReadName');
  }

  /**
   * 保存账号实名情况
   * @param value  账号是否实名
   * @param key  对应的键
   */
  SaveReadName(value: boolean, key?: string) {
    sessionStorage.setItem(key || 'isRealName', value.toString());
  }

  /**
   * 保存用户头像
   * @param value 
   * @param key 
   */
  SaveUserHeadImageUrl(value:string,key?:string) {

    sessionStorage.setItem(key || 'headImageUrl',value);
  }

  /**
   * 获取用户头像链接
   * @param key 
   */
  GetUserHeadImageUrl(key?:string) {

    return sessionStorage.getItem(key || 'headImageUrl');
  }
  
  /**
   * 获取账号是否实名情况
   * @param key  账号是否实名对应的键
   * 
   * return bool 返回账号是否是实名
   */
  CheckIsReadName(key?: string): boolean {
    return !!sessionStorage.getItem(key || 'isRealName');
  }

  /**
   * 保存是否是公司账号
   * @param value 是否是公司账号
   * @param key 
   *  返回是否是公司账号
   */
  SaveCompanyAccountInfo(value: boolean, key?: string) {
    console.log('真假' + value);
    console.log('字符串' + value.toString());
    sessionStorage.setItem(key || 'isCompanyAccount', value.toString());
  }

  /**
   * 获取是否是公司账号
   * @param key  
   * 
   * return bool 返回是否是公司账号
   */
  CheckIsCompanyAccount(key?: string): boolean {
    return !!sessionStorage.getItem(key || 'isCompanyAccount');
  }

  /**
   * 设置用户姓名
   * @param value 用户姓名
   * @param key 键
   */
  SetPersonName(value: string, key?: string) {
    sessionStorage.setItem(key || 'personName', value);
  }



  /**
   * 获取用户姓名
   * @param key 键
   * return 返回用户姓名
   */
  GetPersonName(key?: string): string {
    return sessionStorage.getItem(key || 'personName');
  }

  /**
   *  获取Token
   * @param key access_token
   * return string 返回token
   */
  GetToken(key?: string ): string {
    return sessionStorage.getItem(key || 'access_token');
  }

  /**
   * 获取用户名
   * @param key userName
   * return string 返回用户名
   */
  GetUserName(key?: string): string {
    return sessionStorage.getItem(key || 'userName');
  }

  /**
   *  获取Token过期时间
   * @param key expires
   * return Date 返回token的过期时间 date类型
   */
  GetExpires(key?: string): Date {
    return new Date( sessionStorage.getItem(key || 'expires'));

  }

  /**
   * 设置Token
   * @param value 保存的token
   * @param key access_token
   */
  SetToken(value: string, key?: string) {
    sessionStorage.setItem(key || 'access_token', value);
  }
  /**
   * 设置用户名（手机号）
   * @param value 用户名（手机号）
   * @param key userName
   */
  SetUserName(value: string, key?: string ) {
    sessionStorage.setItem(key || 'userName', value);
  }


  /**
   * 设置Token过期时间
   * @param value Token过期时间
   * @param key expires
   */
  SetExpires(value: string, key?: string ) {
    sessionStorage.setItem(key || 'expires' , value);
  }

  /**
   * 判断是否登录
   * @param key 是否登录
   * return bool
   */
  IsLogin(key?: string): boolean {
    return this.GetExpires(key) >  new Date() && !!this.GetToken();    // 过期时间大于现在说明没有过期
  }

  /**
   * 保存备案的企业名称
   */
  SaveBindCompanyName(Compannyname:string,key?:string) {
    sessionStorage.setItem(key || 'bindCompannyName',Compannyname);
  }

  /**
   * 获取登录用户保存的备案企业名称
   * @param key 
   */
  GetBindCompannyName(key?:string):string {

    return sessionStorage.getItem(key || 'bindCompannyName');
  }

  /**
   * 移除token
   */
  removeToken() {
    sessionStorage.removeItem('access_token');
  }
  
}
