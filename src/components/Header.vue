<style lang="scss" scoped>
@import '../common/scss/common.scss';
.header {
  position: relative;
  width: 100%;
  height: $headerTop;
  line-height: $headerTop;
  color: #ffffff;
  // background-color:#11132A;
  background-color: #434B7E;
  .logoIcon {
    width: 50px;
    height: 50px;
  }
  .manageBox{
    font-size: 14px;
    margin-left: 20px;
    cursor: pointer;
    .iconstyle{
      font-size: 14px;
      padding-right: 3px;
    }
  }
}
</style>
<template>
  <div class="header">
    <div class="left"><img class="logoIcon" src="../images/logo1.jpg"></div>
    <div class="left manageBox">
      西瓜帮你找后台管理系统
    </div>
    <!-- <div class="right manage-box margR20" @click="logout">
      <i class="iconfont iconstyle icon-logout"></i>退出登录
    </div> -->
  </div>
</template>
<script>
import { logoutUrl, ERR_OK } from '@/api/index'
export default {
  data() {
    return {
      role: '',
      username: 'admin',
      icon: 'icon-manage'
    }
  },
  props: {
      isShowHeaderMore: {
        type: Boolean,
        default: true
      }
    },
  methods: {
    manage(){
      // localStorage.setItem('_lSidebar','manage');
      // this.$emit('childToParentEvent', 'manage')
      this.$router.push('/apply');
    },
    setting() {
      // localStorage.setItem('_lSidebar','setting');
      // this.$emit('childToParentEvent', 'setting')
      this.$router.push('/setting');
    },
    logout() {
      /*window.localStorage.removeItem("authorization");
      console.log(localStorage.getItem('authorization'),'--authorization---')
      var url = logoutUrl;
      this.$axios.post(url,null).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--result.status_code--');
        if(result.status_code == ERR_OK){
          this.$router.push('/login');
        }
      });*/
    },
    toFirstPage() {
      // this.$router.push('./firstPage')
    },
    getUserInfo() {
      
    }
  },
  created() {
    // this.getUserInfo()
  }
}
</script>