<style lang="scss" scoped>
.apply{
  .operateTableBox{
    .red{
      color: red;
    }
  }
}
</style>
<template>
  <div class="apply" ref="apply">
    <div class="breadcrumbWrapper">
      <div class="breadcrumb">
        <i class="iconfont icon-home iconhomestyle nocurrent"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }"><span class="nocurrent">首页</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="nocurrent">表单管理</span></el-breadcrumb-item>
          <el-breadcrumb-item><span>用户表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <search-condition @clickSearchData="getList">
        <div class="element">
          <p class="inline">编号：</p>
          <div class="inline width160">
             <el-input v-model="form.user_id" size="medium" placeholder="请输入搜索内容" clearable></el-input>
          </div>
        </div>
        <div class="element">
           <p class="inline">昵称：</p>
          <div class="inline width160">
             <el-input v-model="form.nickName" size="medium" placeholder="请输入搜索内容" clearable></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">电话号码：</p>
          <div class="inline width160">
             <el-input v-model="form.phone" size="medium" placeholder="请输入搜索内容" clearable></el-input>
          </div>
        </div>
      </search-condition>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="用户编号">
        </el-table-column>
        <el-table-column prop="master_id" label="师傅ID">
        </el-table-column>
        <el-table-column prop="avatarUrl" label="用户头像">
           <template slot-scope="scope">
              <img :src="scope.row.avatarUrl" class="avatarUrl" width="60">
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" width="120">
        </el-table-column>
        <el-table-column prop="total" label="用户性别">
        </el-table-column>
        <el-table-column prop="gz" label="工种(大类)" width="180">
        </el-table-column>
        <el-table-column prop="is_master" label="是否是师傅" width="100">
          <template slot-scope="scope">
              {{scope.row.is_master|isMaster}}
          </template>
        </el-table-column>
        <el-table-column prop="is_ban" label="状态">
          <template slot-scope="scope">
              <label :class="[scope.row.is_ban==1?'red':'green']">{{scope.row.is_ban|status}}</label>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间" width="160">
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button @click="lookOrder(scope.row)" type="text" size="small" icon="el-icon-view">查看订单</el-button>
            <el-button @click="banUse(scope.row)" type="text" size="small" icon="el-icon-edit-outline">{{scope.row.is_ban==1?'解禁':'禁用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[4,6,8]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// import { ERR_OK } from '@/api/index'
// import { getFullDate } from '@/common/js/utils'
import {userListUrl,banUrl,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      showPageTag:true,
      name: '',
      tableData: [],
      banUrl:"",
      form: {
        user_id:"",
        is_ban:"",
        nickName:"",
        phone:""
      }
    }
  },
  created() {
    this.getList()
  },
  filters:{
    isMaster(value){
      return value==1?"是":"否"
    },
    status(value){
      return value==1?"禁用":"正常"
    }
  },
  components: {
    searchCondition
  },
  methods: {
  	search(){

  	},
    lookOrder(row) {
      // this.form.user_id = row.id
      // this.form.nickName = row.nickName
      // this.$cookie.set('currentId',1)
      this.$router.push({
          path: '/orderListOne?user_id=' + row.id + '&nickName=' + row.nickName 
      })
    },
    ban(){
      let that = this;
      var params = {
        "ban":this.form.is_ban==1?0:1,
        "user_id":this.form.user_id
      }
      var url = banUrl;
      console.log(params,"params")
      that.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.code,"===result.code===")
        if (result.code == ERR_OK) {
          that.getList();
          that.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
        // alert(res)
      })
    },
    banUse(row) {
      var that = this;
      that.form.user_id = row.id
      that.form.is_ban = row.is_ban
      that.$confirm(`此操作将${row.is_ban==1?'解禁':'禁用'}该用户, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.ban();
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    getList() {
      let that = this;
      var params = {
        pageindex:that.pageIndex,
        callbackcount:that.pageSize,
        id:that.form.user_id,
        nickName:that.form.nickName,
        phone:that.form.phone
      }
      var url = userListUrl;
      console.log(params,"params")
      that.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.code,"===result.code===")
        if (result.code == ERR_OK) {
          that.tableData = result.data.user_list;
          for(var i=0;i<that.tableData.length;i++){
            var arr = []
            for(var j=0;j<that.tableData[i].user_category.length;j++){
              arr.push(that.tableData[i].user_category[j].name)
            }
            that.tableData[i].gz = arr.join('、')
          }
          that.total = result.data.count;
          if(that.total<that.pageSize) {
            that.showPageTag = false;
          }else{
            that.showPageTag = true;
          }
        }
        // alert(res)
      })
      // $.ajax({ 
      //   url : url, 
      //   type : 'POST', 
      //   data : JSON.stringify(params),
      //   cache:false,
      //   // 告诉jQuery不要去处理发送的数据
      //   processData : false, 
      //   // 告诉jQuery不要去设置Content-Type请求头
      //   contentType : false,
      //   beforeSend: function (XMLHttpRequest) {
      //     XMLHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      //     // XMLHttpRequest.setRequestHeader("authorization", localStorage.getItem('authorization'));
      //     // that.progressDialog = true;
      //   },
      //   complete: function( xhr,data ){
          
      //   },
      //   success : function(res) { 
      //     if(res.status_code===ERR_OK){
      //       console.log("====成功===");
      //     }else{
      //       console.log("失败");
      //     }
      //   },
      //   error : function(responseStr) { 
      //     // that.$router.push({
      //     //     path: '/login'
      //     // })
      //   } 
      // });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      console.log(val);
      this.getList();
    }
  }
}
</script>


