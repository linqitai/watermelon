/*  说明：
 *  插件文件：utils.js
 *  作者：林祺泰  QQ：514917919
 * */
// 管理员状态( 0:禁用 1:启用),点击禁用,0,点击启用,1
export function getLimiteText(value) {
  let len = 24
  if (value.length > len) {
    return value.substr(0, len) + '···'
  } else {
    return value
  }
}
export function getDaysInYearMonth(year, month){
  var date = new Date(year, month, 0);
  return date.getDate();
}
export function getTime(value) {
  var time = new Date(value).getTime()
  return time
}
//得到当天是周几
export function getDay(date) {
  var day = new Date(date).getDay()
  return day;
}
export function getMonth(date) {
  var month = new Date(date).getMonth()
  return month+1;
}
export function getFullDate(t){
  var value=''
  if(t.toString().length==10){
    value = parseInt(t)*1000
  }else{
    value = parseInt(t)
  }
  var time = new Date(value)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '/' + (m < 10 ? '0' + m : m) + '/' + (d < 10 ? '0' + d : d)
}
export function getFullTime(t){
  var value=''
  if(t.toString().length==10){
    value = parseInt(t)*1000
  }else{
    value = parseInt(t)
  }
  var time = new Date(value)
  var hour = time.getHours()
  return `${hour}:00~${hour+1}:00`
}
export function getSex(t){
  return t==1?"男":"女"
}
