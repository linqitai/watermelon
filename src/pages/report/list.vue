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
          <el-breadcrumb-item><span>反馈表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <el-table :data="tableData" border style="width: 100%;margin-top: 10px;">
        <el-table-column prop="school_id" label="订单号">
        </el-table-column>
        <el-table-column prop="level_id" label="订单发起人">
        </el-table-column>
        <el-table-column prop="type_id" label="接单人">
        </el-table-column>
        <el-table-column prop="type_id" label="施工汇报详情" width="300">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteBtn(scope.row)" type="text" size="small" icon="el-icon-view">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[4,6,8]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
// import { ERR_OK } from '@/api/index'
// import { getFullDate } from '@/common/js/utils'
import {courseListUrl,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      showPageTag:true,
      dialogVisible: false,
      tableData: []
    }
  },
  created() {
    // this.getList()
  },
  components: {
    searchCondition
  },
  methods: {
  	search(){
  		
  	},
    deleteBtn(row) {

    },
    getList() {
      let that = this;
      var params = {
        // store_id: this.store_id,
        // offset: (that.pageIndex-1)*that.pageSize,
        // limit: that.pageSize,
      }
      var url = courseListUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          that.tableData = result.data.course;
          
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