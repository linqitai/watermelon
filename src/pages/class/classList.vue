<style lang="scss" scoped>
.apply{
  .operateTableBox{
    .functionBox{
     
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
          <el-breadcrumb-item :to="{ path: '/' }">
            <span class="nocurrent">首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item><span class="nocurrent">教学部</span></el-breadcrumb-item>
          <el-breadcrumb-item><span>排课信息</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <div class="element">
          <label class="inline">课程名：</label>
          <div class="inline">
             <el-input v-model="name" size="medium" placeholder="请输入所要查询的课程名"></el-input>
          </div>
          <div class="inline">
            <el-button type="primary" size="medium">查询</el-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="school_id"
          label="校区">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="200">
           <template slot-scope="scope">
              {{scope.row.serial}}({{scope.row.name}})
           </template>
        </el-table-column>
        <el-table-column
          prop="level_id"
          label="课程级别">
        </el-table-column>
        <el-table-column
          prop="type_id"
          label="课程类型">
        </el-table-column>
        <el-table-column
          prop="total"
          label="课程人数">
        </el-table-column>
        <el-table-column
          prop=""
          label="无需预订">
        </el-table-column>
        <el-table-column prop="name" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleDetailClick(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
            <el-button @click="handleEditClick(scope.row)" type="text" size="small" icon="el-icon-edit-outline">修改</el-button>
            <el-button @click="handleDeleteClick(scope.row)" type="text" size="small" icon="el-icon-close">删除</el-button>
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
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      showPageTag:true,
      name: '',
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleDetailClick(row) {

    },
    handleEditClick(row) {

    },
    handleDeleteClick(row) {

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


