<style lang="scss" scoped>
.loginWrap {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #2196F3;
  .login_form{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #2B2B36;
    border-radius: 10px;
    box-shadow: 10px 10px 15px 1px #0D5187;
    .logo{
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 20px;
    }
    .title{
      color: white;
      padding:16px 0;
      text-align: center;
      font-size: 24px;
    }
    .inputWrapper{
      padding:0 20px;
      .inputBox{
        margin-top: 8px;
        border: none;
        border-bottom:1px solid #8F8F8F;
        padding-bottom: 12px;
        .iconStyle{
          color: #8F8F8F;
          font-size: 28px;
          vertical-align: middle;
        }
        .input{
          background-color: inherit;
          border: none;
          height: 34px;
          line-height:34px;
          outline:none;
          font-size: 16px;
          color: #c7c7c7;
          padding-left: 8px;
          width: 300px;
          vertical-align: middle;
        }
      }
    }
    .headButton{
      width: 100%;
      text-align: center;
      height: 60px;
      line-height: 60px;
      background-color: #23232E;
      color: white;
      font-size: 26px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .fotButton{
      width: 100%;
      margin-top:20px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      background-color: #2196F3;
      color: white;
      font-size: 20px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      cursor: pointer;
      &:hover{
        background-color:#0071CA;
      }
    }
    .statusBox{
      padding: 0 20px;
      padding-top: 20px;
      .el-checkbox{
        margin-left: 5px;
      }
      p{
        float: right;
        color: #2196F3;
        font-size: 14px;
        cursor: pointer;
        line-height: 20px;
      }
    }
  }
}
</style>
<template>
  <div class="loginWrap container" id="particles-js">
    <div class="login_form">
      <div class="headButton">西瓜帮你找</div>
      <img class="logo" src="../../images/logo1.jpg" width="60" height="60">
      <div class="title">欢迎登录</div>
      <div class="inputWrapper">
        <div class="inputBox">
          <i class="iconfont icon-username iconStyle"></i><input class="input" type="text" name="username" v-model="username" @keyup.enter="tonext(1)" placeholder="用户名/手机号">
        </div>
        <div class="inputBox">
          <i class="iconfont icon-password iconStyle"></i><input class="input" type="password" name="password" v-model="password" @keyup.enter="loginBtn" placeholder="请输入登录密码">
        </div>
      </div>
      <div class="statusBox">
        <el-checkbox v-model="statusChecked">记住登录状态</el-checkbox>
        <p>忘记密码</p>
      </div>
      <div class="fotButton" @click="loginBtn">登录</div>
    </div>
  </div>
</template>
<!-- scripts -->
<!-- <script src="js/particles.min.js"></script>
  <script src="js/app.js"></script> -->
<script>
$(function(){
  $('.fotButton').click(function(){
    console.log("click me")
  });
});

// import { loginUrl } from '@/api/index'
import { loginUrl,ERR_OK } from '@/api/index'
import axios from 'axios'
// import pJS from 'pJS'
export default {
  data: function() {
    return {
      username: 'admin',
      password: '123456',
      ishover: false,
      autofocus: true,
      loginStatus: "",
      statusChecked: true,
      authorization:''
    }
  },
  created() {
    var inputs = document.getElementsByTagName('input')
  },
  methods: {
    hover() {
      this.ishover = !this.ishover
    },
    tonext(index) {
      console.log("click")
      var inputs = document.getElementsByTagName('input')
      inputs[index].focus()
    },
    loginBtn() {
      var that = this;
      if(!this.username||!this.password) {
        this.$message('账号或密码不能为空');
        return;
      }
      var params = {
        account: this.username,
        pass_word: this.password,
        // remember: this.statusChecked?'1':'0'
      }
      var url = loginUrl;
      console.log(params)
      $.ajax({ 
        url : url, 
        type : 'POST', 
        data : params, 
        beforeSend:function(){
          console.log("正在进行，请稍候");
        },
        complete: function( xhr,data ){
          // this.authorization = xhr.getResponseHeader('authorization')
          
          // console.log(xhr.getResponseHeader('authorization'),'authorization')
          // console.log(data,'data')
        },
        success : function(res) { 
          console.log(res.code,'==res.code==')
          if(res.code===200){
            localStorage.setItem('token', res.data.token)
            // that.$cookie.set('currentTitleId',0);
            that.$router.push('./userList')
            console.log("成功");
          }else{
            console.log("失败");
          }
        }, 
        error : function(responseStr) { 
          that.$message({
            type: 'info',
              message: '出错了'
          });
        } 
      });
      /*this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(ERR_OK,'--ERR_OK-')
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
           this.$router.push('./setting')
          // that.qrcode = result.data.url;
          // console.info(that.directUrl,'--that.directUrl--');
        }
      }).catch((err)=>{
        console.info(err);
      });*/
    }
  }
}
</script>

<style lang="scss">
</style>