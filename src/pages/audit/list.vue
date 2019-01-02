<style lang="scss" scoped>
.apply{
  .operateTableBox{
    .selectStatus{
      margin-top: 11px;
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
          <el-breadcrumb-item><span>审核列表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <search-condition @clickSearchData="getList">
        <div class="element">
          <el-radio-group class="selectStatus" v-model="form.is_pass" @change="changePass">
            <el-radio :label="2">待审核</el-radio>
            <el-radio :label="1">已通过</el-radio>
          </el-radio-group> 
        </div>
        <div class="element">
          <p class="inline">编号：</p>
          <div class="inline width160">
             <el-input v-model="form.id" size="medium" placeholder="请输入搜索内容" clearable></el-input>
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
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="id" label="编号">
        </el-table-column>
        <el-table-column prop="user.nickName" label="昵称" width="160">
          <template slot-scope="scope">
            {{scope.row.user.nickName}}
            <!-- <el-tooltip class="width140 ellipsis" effect="dark" :content="scope.row.user.nickName" placement="top-start">
               <el-button type="text">{{scope.row.user.nickName}}</el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="gz" label="所选工种" width="160">
        </el-table-column>
        <el-table-column prop="address" label="居住地址" width="200">
        </el-table-column>
        <el-table-column prop="type_id" label="身份证（正反）" width="190">
          <template slot-scope="scope" v-if="">
            <img :src="scope.row.img_1" width="80" :preview="scope.row.id" preview-text="描述文字">
            <img :src="scope.row.img_2" width="80" :preview="scope.row.id" preview-text="描述文字">
          </template>
        </el-table-column>
        <el-table-column prop="has_insurance" label="是否购买保险" width="120">
          <template slot-scope="scope">
            {{scope.row.has_insurance==1?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="申请时间" width="160">
        </el-table-column>
        <el-table-column prop="name" label="操作" fixed="right" width="120" v-if="form.is_pass==2">
          <template slot-scope="scope">
            <el-button @click="operateBtn('pass',scope.row)" type="text" size="small" icon="el-icon-view">通过</el-button>
            <el-button @click="operateBtn('refuse',scope.row)" type="text" size="small" icon="el-icon-view">拒绝</el-button>
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
import {masterApplyListUrl,auditPassUrl,refusePassUrl,ajax,p,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 4,
      total: 100,
      showPageTag:true,
      dialogVisible: false,
      tableData: [],
      operate:'',
      form:{
        is_pass: 2,
        id:"",
        nickName:"",
        phone:""
      }
    }
  },
  created() {
    this.getList()
  },
  components: {
    searchCondition
  },
  methods: {
    changePass(value) {
      console.log(value,"is_pass")
      this.form.is_pass = value;
      this.getList();
    },
    operateBtn(operate,row) {
      var that = this;
      this.$confirm(`此操作将${operate=='pass'?'通过审核':'拒绝通过审核'}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.operateEvent(operate,row);
      }).catch(() => {
         that.$message({
            showClose: true,
            message: '已取消',
            type: 'success'
          });
      });
    },
    operateEvent(operate,row) {
      let that = this;
      var params = {
        user_id: row.user_id,
        master_id:row.id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = operate=='pass'?auditPassUrl:refusePassUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          });
        }
      });
    },
    getList() {
      let that = this;
      var params = {
        pageindex:that.pageIndex,
        callbackcount:that.pageSize,
        is_pass:this.form.is_pass,
        id:this.form.id,
        nickName:this.form.nickName,
        phone:this.form.phone,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = masterApplyListUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.list;
          for(var i=0;i<that.tableData.length;i++){
            var arr = []
            for(var j=0;j<that.tableData[i].master_category.length;j++){
              arr.push(that.tableData[i].master_category[j].name)
            }
            that.tableData[i].gz = arr.join('、')
          }
          that.$previewRefresh();//浏览图片的代码
          that.total = result.data.count;
          if(that.total<that.pageSize) {
            that.showPageTag = false;
          }else{
            that.showPageTag = true;
          }
        }
      });
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