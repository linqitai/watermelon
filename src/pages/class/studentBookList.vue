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
          <el-breadcrumb-item><span>学生订课列表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <div class="element">
          <label class="inline">学号：</label>
          <div class="inline">
             <el-input v-model="no" size="medium" placeholder="请输入所要查询的学号" clearable></el-input>
          </div>
          <label class="inline margL20">课程名称：</label>
          <div class="inline">
             <el-input v-model="courseName" size="medium" placeholder="请输入所要查询的课程名称" clearable></el-input>
          </div>
          <div class="inline">
            <el-button type="primary" size="medium" @click="search">查询</el-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="user.en_name"
          label="订课学生">
        </el-table-column>
        <el-table-column
          prop="user.sex"
          label="性别">
            <template slot-scope="scope">
              {{scope.row.user.sex|filterSex}}
            </template>
        </el-table-column>
        <el-table-column
          prop="arranging.begin_time"
          label="订课时间">
          <template slot-scope="scope">
              {{scope.row.arranging.begin_time|filterDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="arranging.course.name"
          label="课程类型名称">
        </el-table-column>
        <el-table-column
          prop="arranging.lesson.name"
          label="话题">
        </el-table-column>
        <el-table-column
          prop="arranging.begin_time"
          label="上课时间">
          <template slot-scope="scope">
              {{scope.row.arranging.begin_time|filterDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="arranging.room.name"
          label="教室名称">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDropClick(scope.row)" type="text" size="small" icon="el-icon-close">退课</el-button>
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
import { studentBookListUrl,ERR_OK } from '@/api/index'
import { getSex,getFullDate } from '@/common/js/utils'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      showPageTag:true,
      no: '',
      courseName: '',
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  filters:{
    filterSex(t){
      return t==1?"男":"女"
    },
    filterDate(t){
      return getFullDate(t)
    }
  },
  methods: {
    handleDropClick(row) {
      console.log(row.user_id,"user_id")
    },
    search() {
      this.getList()
    },
    getList() {
      var that = this;
      var params = {
        serial: that.no,
        course_name: that.courseName
      }
      var url = studentBookListUrl;
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


