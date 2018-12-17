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
    <div class="right manage-box margR20 cursor" @click="setting">
      <i class="iconfont iconstyle icon-setting"></i> 设置押金金额
     <!-- 目前的押金金额:{{deposit}} -->
    </div>
    <el-dialog title="设置押金金额" :visible.sync="dialogFormVisible" :append-to-body="true" :fullscreen="false" width="400px">
      <div class="dialogBody">
        <div class="element">
          <label class="inline">当前押金金额：{{deposit}}</label>
        </div>
        <div class="element margT20">
          <label class="inline">设置押金金额：</label>
          <div class="inline">
             <el-input v-model="form.deposit" size="medium" placeholder="请输入金额"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="margL12" type="primary" @click="sureBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { depositShowUrl,depositSetUrl,ajax,p,ERR_OK } from '@/api/index'
export default {
  data() {
    return {
      role: '',
      username: 'admin',
      icon: 'icon-manage',
      deposit:"",
      form: {
        deposit:""
      },
      dialogFormVisible: false
    }
  },
  props: {
      isShowHeaderMore: {
        type: Boolean,
        default: true
      }
    },
  created(){
    // this.getDeposit();
  },
  methods: {
    manage(){
      // localStorage.setItem('_lSidebar','manage');
      // this.$emit('childToParentEvent', 'manage')
      this.$router.push('/apply');
    },
    setting() {
      this.getDeposit();
      this.dialogFormVisible = true
    },
    sureBtn() {
      let that = this;
      var params = {
        "deposit": this.form.deposit,
        token:localStorage.getItem('token')
      };
      // Object.assign(params, params, p);
      var url = depositSetUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          // that.tableData = result.data.report_list;
          // this.deposit = result.data.deposit;
          that.dialogFormVisible = false;
          that.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
      });
    },
    getDeposit(){
      console.log("getDeposit-=-=-=-=-=-=")
      let that = this;
      var params = {
        token:localStorage.getItem('token')
      };
      // Object.assign(params, params, p);
      var url = depositShowUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          // that.tableData = result.data.report_list;
          that.deposit = result.data.deposit;
        }
      });
      var method = "POST";
      // ajax(url,method,params,that.successed);
    },
    successed(res) {

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