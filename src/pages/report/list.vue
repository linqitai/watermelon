<style lang="scss" scoped>
.apply{
  .operateTableBox{

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
          <el-breadcrumb-item><span>施工汇报表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <el-table :data="tableData" border style="width: 100%;margin-top: 10px;">
        <el-table-column prop="task_id" label="订单号">
        </el-table-column>
        <el-table-column prop="task.user_nickName" label="订单发起人">
        </el-table-column>
        <el-table-column prop="task.master_nickName" label="接单人">
        </el-table-column>
        <el-table-column prop="report" label="施工汇报详情" width="300">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteBtn(scope.row)" type="text" size="small" icon="el-icon-view">删除</el-button>
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
import {reportListUrl,reportDelUrl,ajax,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 8,
      total: 100,
      showPageTag:true,
      dialogVisible: false,
      tableData: [],
      report_id:""
    }
  },
  created() {
    this.getList()
  },
  components: {
    searchCondition
  },
  methods: {
  	search(){
  		
  	},
    deleteBtn(row) {
      var that = this;
      this.report_id = row.id
      that.$confirm(`此操作将删除该用户, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.delete();
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    delete() {
      let that = this;
      var params = {
        "report_id": this.report_id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = reportDelUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          // that.tableData = result.data.report_list;
          that.getList();
          that.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
      });
    },
    getList() {
      let that = this;
      var params = {
        pageindex:that.pageIndex,
        callbackcount:that.pageSize,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = reportListUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.report_list;
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
      // this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      console.log(val);
      // this.getList();
    }
  }
}
</script>