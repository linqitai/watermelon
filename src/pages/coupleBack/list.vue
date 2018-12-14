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
        <!-- <el-table-column prop="school_id" label="反馈标题">
        </el-table-column> -->
        <el-table-column prop="content" label="反馈内容">
        </el-table-column>
        <el-table-column prop="img_address" label="反馈图片">
          <template slot-scope="scope">
            <img :src="scope.row.img_address" height="60" :preview="scope.row.id" preview-text="描述文字">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="200">
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
import {feedbackUrl,feedbackDelUrl,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      showPageTag:true,
      tableData: [],
      feed_back_id:''
    }
  },
  created() {
    this.getList()
  },
  components: {
    searchCondition
  },
  methods: {
    delete() {
      let that = this;
      var params = {
        feed_back_id:that.feed_back_id
      }
      var url = feedbackDelUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      });
    },
  	search(){
  		
  	},
    deleteBtn(row) {
      var that = this;
      that.feed_back_id = row.id;
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getList() {
      let that = this;
      var params = {
        pageindex:that.pageIndex,
        callbackcount:that.pageSize
      }
      var url = feedbackUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.feedback;
          console.log(that.tableData,"that.tableData")
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