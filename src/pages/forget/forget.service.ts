import { Injectable } from '@angular/core';


@Injectable()
export class ForgetService {

  typeLink: any = [
    {
      id: 1,
      data: '',
      name: '手机号',
      icon: '\ue61a',
      msg: '请输入手机号',
      errTitle: '',
      but: true,
      inputType: 'text'
    },
    {
      id: 2,
      data: '',
      name: '验证码',
      icon: '\ue60d',
      msg: '请输入验证码',
      errTitle: '',
      inputType: 'text'
    }
  ];

  typePass: any = [
    {
      id: 1,
      data: '',
      name: '新密码',
      icon: '\ue60f',
      msg: '请输入新密码',
      errTitle: '',
      inputType: 'password'
    },
    {
      id: 2,
      data: '',
      name: '确认密码',
      icon: '\ue61b',
      msg: '请重新输入新密码',
      errTitle: '',
      inputType: 'password'
    }
  ]


  constructor() { }
  // 表单提交
  submit(item,status){
    let data = this.allForm(item,status);
    return {
      status: 1,
      data
    }
  }

<<<<<<< HEAD
  // 表单验证
  changTag(item: any,index: number,status: number){
    if(item[index].data === ""){
      return {
        title: item[index].errTitle = `${item[index].name}不能为空`
      };
    }
    if(status === 0){
      if(!(/^1[34578]\d{9}$/.test(item[index].data)) && item[index].id === 1){
        return {
          title: item[index].errTitle = "手机号有误，请填写正确的手机号"
        };
      }
    }
    // 验证密码是否一致
    if(status === 1){
      if(this.typePass[0].data !== this.typePass[1].data && this.typePass[0].data != '' && this.typePass[1].data != ''){
       return {
          title: item[index].errTitle = "密码两次输入不正确"
       } 
      }
      if(this.typePass[index].data.length < 6){
        return {
          title: item[index].errTitle = "密码不能少于6位"
        }
      }
    }
    return {
      title: ''
    };
  }
  // 表单统一验证
  allForm(item,status){
    let data = [];
    item.forEach(element => {
      if(element.data === ''){
        element.errTitle = `${element.name}不能为空`
        data.push(element)
      }
    });
    return item;
=======
  all(){
>>>>>>> 856a7a0d8d0c1b2b5b818892e3fd3dc60c30a600
  }
  // 表单统一验证核心
  authCode(type,status){
    let data: any;
    let arrLen = [];
    data = this.submit(type,status);
    if(data.data.length > 0){
      for(let i = 0; i <= data.data.length-1; i++){
        // 如果输入宽输入正确就赋值，到后面进行判断跳转
        if(data.data[i].data != ''){
          arrLen.push(data.data[i].data);
        }
        // 要是没有值就是为空，统一进行非空判断
        else if(data.data[i].id === type[i].id){
          if(data.data[i].data === ''){
            type[i].errTitle = data.data[i].errTitle;
            return {
              type,
              success: false
            }
          }
        }
      }
      // 到这里进行判断跳转到下一步页面
      if(arrLen.length === data.data.length){
        return {
          type: data.data,
          success: true
        }
      }
    }
  }

  // 最终验证，表示可以提交表单
  endForm(index,status){
    let data: any;
    let arrItem: any;
    
    if(status === 0){
      data = this.changTag(this.typeLink,index,status);
      this.typeLink[index].errTitle = data.title;
      arrItem = this.typeLink;
    }
    if(status === 1){
      data = this.changTag(this.typePass,index,status);
      this.typePass[index].errTitle = data.title;
      arrItem = this.typePass;
    }
    if(arrItem.length > 0){
      let arrItems = [];
      arrItem.forEach(element => {
        if(element.errTitle === ''){
          arrItems.push(element)
        }
      });
      // 验证成功
      if(arrItem.length === arrItems.length){
        return true;
      }else{
        return false;
      }
    }
  }

}
