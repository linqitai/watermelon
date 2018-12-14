<style lang="scss" scoped>
.apply{
  padding:12px 20px;
  background-color: white;
  .operateTableBox{
    margin-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #F3F2F2;
    background-color: #F2F2F2;
    .functionBox{
      padding: 18px;
      .status{
        width: 120px;
      }
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
          <el-breadcrumb-item><span>话题列表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <div class="element">
          <label class="inline">姓名：</label>
          <div class="inline">
             <el-input v-model="name" size="medium" placeholder="请输入所要查询的姓名"></el-input>
          </div>
          <div class="inline">
            <el-button type="primary" size="medium">查询</el-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="话题名称">
           <!-- <template slot-scope="scope">
              {{scope.row.serial}}({{scope.row.name}})
           </template> -->
        </el-table-column>
        <el-table-column
          prop="level_id"
          label="话题编号">
        </el-table-column>
        <el-table-column
          prop="type_id"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="total"
          label="话题简介">
        </el-table-column>
        <el-table-column
          prop=""
          label="话题顺序">
        </el-table-column>
        <el-table-column prop="name" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleEditClick(scope.row)" type="text" size="small" icon="el-icon-edit-outline">修改</el-button>
            <el-button @click="handleDeleteClick(scope.row)" type="text" size="small" icon="el-icon-close">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { ERR_OK } from '@/api/index'
// import { getFullDate } from '@/common/js/utils'
export default {
  data() {
    return {
      tableData:[],
      name:""
    }
  },
  created() {
    
  },
  methods: {
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
    handleEditClick(row) {

    },
    handleDeleteClick(row) {

    },
  }
}
</script>


