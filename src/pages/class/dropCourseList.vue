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
          <el-breadcrumb-item><span>退课列表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <div class="element">
          <label class="inline">学号：</label>
          <div class="inline">
             <el-input v-model="no" placeholder="请输入所要查询的学号"></el-input>
          </div>
          <div class="inline">
            <el-button type="primary" size="">查询</el-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="drop_people.serial"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="drop_people.en_name"
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="drop_people.mobile"
          label="手机号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="arranging.updatad_at" label="退课时间" width='160'>
          <template slot-scope="scope">
              {{scope.row.arranging.updated_at}}
          </template>
        </el-table-column>
        <el-table-column prop="arranging.begin_time"  label="上课日期" width="120">
          <template slot-scope="scope">
              {{scope.row.arranging.begin_time | filterDate}}
          </template>
        </el-table-column>
        <el-table-column prop="arranging.begin_time" label="上课时间" width="120">
          <template slot-scope="scope">
              {{scope.row.arranging.begin_time | filterTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="arranging.course.name"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="arranging.course.type_id"
          label="课程类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="是否本人退课"
          width="120">
        </el-table-column>
        <el-table-column
          prop="drop_people.en_name"
          label="退课人">
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
import { dropsListUrl,ERR_OK } from '@/api/index'
import { getFullDate,getFullTime } from '@/common/js/utils'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      schoole_id: localStorage.getItem("_school_id"),
      showPageTag:true,
      no: '',
      tableData: []
    }
  },
  filters:{
    filterSex(t){
      return t==1?"男":"女"
    },
    filterDate(t){
      return getFullDate(t)
    },
    filterTime(t){
      return getFullTime(t)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var that = this;
      var params = {
        // school_id: that.schoole_id
      }
      var url = dropsListUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          that.tableData = result.data;
          
        }
      })
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


