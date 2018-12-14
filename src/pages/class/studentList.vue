<style lang="scss" scoped>
.apply{
  .operateTableBox{
    .functionBox{
     
    }
  }
  .changeStatusDialog{
    box-shadow:3px 3px 20px 3px rgba(0,0,0,0.5);
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
          <el-breadcrumb-item><span>学生列表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <div class="element">
          <div class="inline">
            <el-button type="primary" size="medium">新增</el-button>
          </div>
          <div class="inline margL20">
             <el-select class="width120" size="medium" v-model="option" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="inline">
             <el-input style="width: 160px;" v-model="value" placeholder="查询内容" size="medium"></el-input>
          </div>
          <div class="inline">
            <el-button type="primary" size="medium">查询</el-button>
          </div>
          <div class="inline right margL20">
            <el-button type="primary" size="medium">导入</el-button>
          </div>
          <div class="inline right">
            <el-button type="primary" size="medium">导出</el-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="操作">
        </el-table-column>
        <el-table-column prop="end_time" label="最后跟踪时间" width="120">
        </el-table-column>
        <el-table-column prop="track_people.en_name" label="跟踪人" width="120">
        </el-table-column>
        <el-table-column prop="contract_no" label="合同编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="CSA">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="cn_name" label="中文名">
        </el-table-column>
        <el-table-column prop="en_name" label="英文名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
              {{scope.row.sex | filterSex}}
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机" width="120">
        </el-table-column>
        <el-table-column
          prop="home_phone"
          label="家庭电话">
        </el-table-column>
        <el-table-column
          prop="begin_level"
          label="开始级别">
        </el-table-column>
        <el-table-column
          prop="end_level"
          label="结束级别">
        </el-table-column>
        <el-table-column
          prop="level.name"
          label="当前级别">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="handleEditClick(scope.row)" type="text" size="small" icon="el-icon-edit-outline">编辑</el-button>
            <el-button @click="handleEditStatusClick(scope.row)" type="text" size="small" icon="el-icon-edit-outline">修改状态</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[4,6,8]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div> -->
    </div>
    <el-dialog class="changeStatusDialog" title="修改状态" :visible.sync="isShowStatusDialog"  :modal="false"  width="40%">
      <div class="lineBox">
        <el-radio-group v-model="status">
          <el-radio :label="1">未签</el-radio>
          <el-radio :label="2">执行</el-radio>
          <el-radio :label="3">结束</el-radio>
          <el-radio :label="4">冻结</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowStatusDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div class='mask' v-show="maskIsShow" @click="maskHide"></div> -->
  </div>
</template>
<script>
import { getStudentListUrl,editStudentInfoUrl,ERR_OK } from '@/api/index'
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
      tableData: [],
      option:"学号",
      options:[{
        value:"学号",
        label:"学号"
      },{
        value:"中文名",
        label:"中文名"
      }],
      value:"",
      isShowStatusDialog: false,
      maskIsShow: false,
      status: ""
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
    maskHide(){
      this.isShowStatusDialog = false;
      this.maskIsShow = false
    },
    handleEditClick(row) {

    },
    handleEditStatusClick(row) {
      this.isShowStatusDialog = true;
      this.maskIsShow = true;
    },
    sureBtn() {
      this.isShowStatusDialog = false;
      this.maskIsShow = false;
      var that = this;
      var params = {
        status: that.status
      }
      var url = editStudentInfoUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          that.$alert('修改成功')
        }
      })
    },
    getList() {
      var that = this;
      var params = {
        school_id: that.schoole_id
      }
      var url = getStudentListUrl;
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


