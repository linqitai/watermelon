import $ from 'jquery'
// import http from './public'
import qs from 'qs'
import router from '../router/index'
// import axios from 'axios'
// import http from './service'
export const host = 'http://test.dtc233.com'
// const host = '/jz'
export const ERR_OK = 200

// 登录接口
export const loginUrl = host + '/api/admin/login';

// 课表列表
export const userListUrl = host + '/api/admin/user/list';
// 用户封禁操作
export const banUrl = host + '/api/admin/user/ban';
// 反馈列表
export const feedbackUrl = host + '/api/admin/feedback/list';
// 删除反馈
export const feedbackDelUrl = host + '/api/admin/feedback/del';
// 任务列表
export const taskListUrl = host + '/api/admin/task/list';
// 任务指派师傅
export const sendMasterUrl = host + '/api/admin/task/master/send';
// 手动取消任务
export const cancelTaskUrl = host + '/api/admin/task/cancel';
// 手动取消任务
export const taskCommentUrl = host + '/api/admin/task/comment';
// 施工汇报
export const reportListUrl = host + '/api/admin/report/list';
// 施工汇报删除
export const reportDelUrl = host + '/api/admin/report/del';
// 申请师傅的审核列表
export const masterApplyListUrl = host + '/api/admin/master/apply';
// 幻灯片列表
export const swiperListUrl = host + '/api/admin/index/carouse/show';
// 删除轮播图
export const delSwiperListUrl = host + '/api/admin/index/carouse/del';
// 添加轮播图
export const addSwiperListUrl = host + '/api/admin/index/carouse/add';
// 图片上传接口
export const imgUploadUrl = host + '/api/admin/index/img/upload';
// 轮播图编辑
export const editSwiperUrl = host + '/api/admin/index/carouse/edit';
// 审核通过(师傅)
export const auditPassUrl = host + '/api/admin/master/apply/pass';
// 拒绝师傅审核申请
export const refusePassUrl = host + '/api/admin/master/apply/refuse';
// 设为辣鸡信息并且封禁账号
export const setRubbishUrl = host + '/api/admin/task/delban';
// 目前的押金金额
export const depositShowUrl = host + '/api/admin/deposit/show';
// 设置押金金额
export const depositSetUrl = host + '/api/admin/deposit/set';
// 轮播图是否展示的开关
export const swiperSwitchUrl = host + '/api/admin/index/carouse/switch';

export function ajax(url,method,params,doSuccess) {
  var that = this;
  $.ajax({ 
    url: url, 
    type: method,
    processData: false,
    // data : JSON.stringify(params), 
    data: method=='POST'?qs.stringify(params):params, 
    beforeSend: function (XMLHttpRequest) {
      // XMLHttpRequest.setRequestHeader("token", localStorage.getItem('token'));
      // that.progressDialog = true;
    },
    complete: function( xhr,data ){
      // this.authorization = xhr.getResponseHeader('authorization')
      // console.log(xhr.getResponseHeader('authorization'),'authorization')
      // console.log(data,'data')
    },
    success : function(res) {
      console.log(res,"====res====")
      // console.log(res.data.indexOf('登录'),"res.data.indexOf('登录')")
      if(res.code == 401 && res.data.indexOf('登录')>-1){
        // that.$router.push('/login')
        router.replace({
          path: '/login'
        })
      }
      if (typeof doSuccess == "function") {
        doSuccess(res);
      }
    },
    error : function(responseStr) { 
     console.log(responseStr,"responseStr")
    } 
  });
}




