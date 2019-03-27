import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../forget.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { TypeInterface } from '../dataType'

@Component({
  selector: 'app-forget-module',
  templateUrl: './forget-module.page.html',
  styleUrls: ['./forget-module.page.scss','../../../assets/newFonts/iconfont.css'],
})
export class ForgetModulePage implements OnInit {
  
  constructor(private forgetService: ForgetService) { }
  // 是手机验证码还是密码的状态切换 0 = 手机验证码,1 = 重新设置密码
  status: number = 0;
  // 手机验证码数据
  typeLink: any;
  // 密码修改数据
  typePass: any;
  // 验证成功标识
  success: boolean;
// &#xe60d;
  

  // 表单验证
  changTag(index: number): void {
    this.success = this.forgetService.endForm(index,this.status);
  }

  // 获取验证码
  clickName(){
    console.log("获取验证码")
  }
  // 统一提交表单
  submit(): void{
    let data: any;
    if(this.status === 0){
      data = this.forgetService.authCode(this.typeLink,this.status);
      this.typeLink = data.type;
     
    }
    if(this.status === 1){
      data = this.forgetService.authCode(this.typePass,this.status);
      this.typePass = data.type;
    }
    if(this.success && data.success && this.status === 0){
      this.status = 1;
    }else
    if(this.success && data.success && this.status === 1){
      console.log("验证成功可以提交数据")
    }
  }
 
  ngOnInit(): void {
    this.typeLink = this.forgetService.typeLink;
    this.typePass = this.forgetService.typePass;
  }

  trackByItem(index: number,item: any): number{
    return index;
  }

}
