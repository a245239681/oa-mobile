import { ValidatorFn, AbstractControl, FormControl, FormGroup } from '@angular/forms';

// 常用正则表达式


export const RegularExpression = {
  'matchPhone': /^[1][3,4,5,7,8,9][0-9]{9}$/,     // 匹配手机
  // 匹配15位和18位身份证号
  'matchIDCard': /^[1-9]\d{5}(18|19|([2]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,    // 匹配身份证

  /**
   * 校验IOS 中文输入英文的六分之一空格
   */
  'matchIOSSpace': /\u2006/g,

  /**
   * 校验空格
   */
  'matchSpace': /(^\s*)|(\s*$)/g,
};



// 正则表达式验证
export function forRegExpValidator(nameRe: RegExp, properyName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const res = !control.value || nameRe.test(control.value);
    const errorObj = { ForRegExpValidator: !res };
    errorObj[properyName] = { value: control.value };
    return res ? null : errorObj;
  };
}

// 密码校验
export function equalValidetor(group: FormGroup): any {
  const password: FormControl = group.get('password') as FormControl;
  const pConfirm: FormControl = group.get('pConfirm') as FormControl;
  const valid: boolean = (password.value === pConfirm.value);
  console.log('密码校验结果：' + valid);
  return valid ? null : { equal: { descs: '密码和确认密码不匹配' } };
}


/**
 * 比较日期天数
 * @param startDate 开始日期
 * @param endDate  结束日期
 * 返回负数说明日期已过 正数说明还有几天到期
 */
export function getDateDiff(startDate: string, endDate: string): number {
  if (!startDate || !endDate) { return; }
  var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
  var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
  var dates = (startTime - endTime) / (1000 * 60 * 60 * 24);
  return dates;
}

/**
 * 比较日期 参数为string或者date类型
 * return number >0 则是大于0 等于0等于0 -1小于0
 */
export function comopareDate(date1: any, date2: any): number {

  /**
   * 如果是date类型就直接比较，如果不是就转成string
   */

  let comparedate1: Date = typeof (date1) == 'string' ? dateParse(date1.toString()) : date1;

  let comparedate2: Date = typeof (date2) == 'string' ? dateParse(date2.toString()) : date2;

  if (comparedate1.getTime() > comparedate2.getTime()) {

    return 1;

  } else if (comparedate1.getTime() == comparedate2.getTime()) {

    return 0;

  } else {

    return -1;
  }
}

/** 
 * 日期解析，字符串转日期 
 * @param dateString 可以为2017-02-16，2017/02/16，2017.02.16 
 * @returns {Date} 返回对应的日期对象 
 */
function dateParse(dateString: string): Date {
  var SEPARATOR_BAR = "-";
  var SEPARATOR_SLASH = "/";
  var SEPARATOR_DOT = ".";
  var dateArray;
  if (dateString.indexOf(SEPARATOR_BAR) > -1) {
    dateArray = dateString.split(SEPARATOR_BAR);
  } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
    dateArray = dateString.split(SEPARATOR_SLASH);
  } else {
    dateArray = dateString.split(SEPARATOR_DOT);
  }
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
}


/**
 * 根据时间辍返回对应的时间 如 yyyy-MM-dd HH:mm:ss  yyyy-MM-dd 
 * @param date 时间 辍
 * @param format 时间格式 默认返回年月日时分秒 按照的格式化是 yyyy-MM-dd HH:mm:ss
 * @param timeWord 默认返回2018年01月15日 16:26:30  这种  如填写 - 的。则返回 2018-01-15 16:26:30 
 */
export function timeTrans(date: number, format: string = 'yyyy-MM-dd HH:mm:ss', timeWord: string = '') {
  date = date.toString().length == 13 ? date : date * 1000;
  let time = new Date(date);//如果date为13位不需要乘1000
  let YType = timeWord == '' ? '年' : timeWord;
  let MType = timeWord == '' ? '月' : timeWord;
  let DType = timeWord == '' ? '日' : timeWord;
  let dataValue = '';
  let Y = time.getFullYear() + YType;
  let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + MType;
  let D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()) + DType;
  let h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':';
  let m = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':';
  let s = (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
  switch (format) {
    case 'yyyy-MM-dd HH:mm:ss':
      dataValue = Y + M + D + h + m + s;
      break;
    case 'yyyy':
      dataValue = time.getFullYear().toString();
      break;
    case 'MM':
      dataValue = M.substring(0, M.length - 1);
      break;
    case 'dd':
      dataValue = D.substring(0, D.length - 1);
      break;
    case 'yyyy-MM':
      dataValue = Y + M.substring(0, M.length - 1);
      break;
    case 'yyyy-MM-dd':
      dataValue = Y + M + D.substring(0, D.length - 1);
      break;
    case 'MM-dd':
      dataValue = M + D.substring(0, D.length - 1);
      break;
    case 'HH':
      dataValue = h.substring(0, h.length - 1);
      break;
    case 'mm':
      dataValue = m.substring(0, m.length - 1);
      break;
    case 'ss':
      dataValue = s.toString();
      break;
    case 'HH:mm':
      dataValue = h + m.substring(0, m.length - 1);
      break;
    case 'HH:mm:ss':
      dataValue = h + m + s;
      break;
    case 'mm:ss':
      dataValue = m + s;
      break;
    default:
      throw new Error("没有找到对应的时间");
  }
  return dataValue;
}

/**
* 获取文件后缀名
* @param fileName 文件名
*/
export function getFileType(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
}

/**
* 获取文件类型
* @param fileType 文件后缀名
*/
export function getFileMimeType(fileType: string): string {
  let mimeType = '';

  switch (fileType) {
    case 'txt':
      mimeType = 'text/plain';
      break;
    case 'docx':
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;
    case 'doc':
      mimeType = 'application/msword';
      break;
    case 'pptx':
      mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      break;
    case 'ppt':
      mimeType = 'application/vnd.ms-powerpoint';
      break;
    case 'xlsx':
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    case 'xls':
      mimeType = 'application/vnd.ms-excel';
      break;
    case 'pdf':
      mimeType = 'application/pdf';
      break;
    case 'jpg':
      mimeType = 'image/jpeg';
      break;
    case 'png':
      mimeType = 'image/png';
      break;
    case 'gif':
      mimeType = 'image/gif';
      break;
    case 'tif':
      mimeType = 'image/tiff';
      break;
    case 'bmp':
      mimeType = 'image/bmp';
      break;
    case 'mp4':
      mimeType = 'video/mp4';
      break;
    case 'avi':
      mimeType = 'video/x-msvideo';
      break;
    case 'flv':
      mimeType = 'video/x-flv';
      break;
    case 'mp3':
      mimeType = 'audio/mpeg';
      break;
    default:
      mimeType = '';
      break;
  }
  return mimeType;
}
