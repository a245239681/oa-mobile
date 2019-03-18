import { Injectable } from '@angular/core';

// 获取/设置当前登录用户信息类
@Injectable()
export class UserInfo {
  constructor() {}
  /**
   *  获取Token
   * @param key access_token
   * return string 返回token
   */
  GetToken(key?: string): string {
    return localStorage.getItem(key || 'access_token');
  }

  /**
   * 获取用户名
   * @param key userName
   * return string 返回用户名
   */
  GetUserName(key?: string): string {
    return localStorage.getItem(key || 'userName');
  }

  /**
   * 保存上一次登陆成功的用户名
   * @param value 用户名
   * @param key  对应的键名称
   */
  SetUserName(value: string, key?: string) {
    localStorage.setItem(key || 'userName', value);
  }

  /**
   * 保存用户的身份 是否是领导
   * @param key
   */
  SetUserDegree(value: string, key?: string) {
    localStorage.setItem(key || 'UserDegree', value);
  }

  /**
   * 获取用户的身份 是否是领导
   * @param key
   */
  GetUserDegree(key?: string): string {
    return localStorage.getItem(key || 'UserDegree');
  }

  /**
   *  获取Token过期时间
   * @param key expires
   * return Date 返回token的过期时间 date类型
   */
  GetExpires(key?: string): Date {
    return new Date(localStorage.getItem(key || 'expires'));
  }

  /**
   * 设置Token
   * @param value 保存的token
   * @param key access_token
   */
  SetToken(value: string, key?: string) {
    localStorage.setItem(key || 'access_token', value);
  }

  /**
   * 设置Token过期时间
   * @param value Token过期时间
   * @param key expires
   */
  SetExpires(value: string, key?: string) {
    localStorage.setItem(key || 'expires', value);
  }

  /**
   * 判断是否登录
   * @param key 是否登录
   * return bool
   */
  IsLogin(key?: string): boolean {
    return this.GetExpires(key) > new Date() && !!this.GetToken(); // 过期时间大于现在说明没有过期
  }

  /**
   * 移除token
   */
  removeToken() {
    localStorage.removeItem('access_token');
  }

  /**
   *性别
   * @param key  对应的键名称
   */
  Sex(value: string, key?: string) {
    localStorage.setItem(key || 'Sex', value);
  }

  getSex(key?: string): string {
    return localStorage.getItem(key || 'Sex');
  }

  /**
   * 电话号码
   * @param value 保存的电话号码
   * @param key 对应的键名称
   */
  Phone(value: string, key?: string) {
    localStorage.setItem(key || 'Phone', value);
  }

  getPhone(key?: string): string {
    return localStorage.getItem(key || 'Phone');
  }

  /**
   * 手机号码
   * @param value 保存的手机号码
   * @param key 对应的键名称
   */
  Mobile(value: string, key?: string) {
    localStorage.setItem(key || 'Mobile', value);
  }

  getMobile(key?: string): string {
    return localStorage.getItem(key || 'Mobile');
  }

  /**
   * 所属部门
   * @param value 保存的所属部门
   * @param key 对应的键名称
   */
  DeptName(value: string, key?: string) {
    localStorage.setItem(key || 'DeptName', value);
  }

  getDeptName(key?: string): string {
    return localStorage.getItem(key || 'DeptName');
  }

  /**
   * 个人Id
   * @param value 保存的所属部门
   * @param index 对应的键名称
   */
  PersonageId(value: string, key?: string) {
    localStorage.setItem(key || 'id', value);
  }

  getPersonageId(key?: string) {
    return localStorage.getItem(key || 'id');
  }

  /**
   * 生日
   * @param value 保存的生日
   * @param index 对应的键名称
   */
  Birthday(value: string, key?: string) {
    localStorage.setItem(key || 'Birthday', value);
  }

  getBirthday(key?: string) {
    return localStorage.getItem(key || 'Birthday');
  }
}
