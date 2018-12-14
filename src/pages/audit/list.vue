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
      <search-condition @clickSearchData="getList">
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
        <el-table-column prop="user.nickName" label="昵称" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="gz" label="所选工种" width="160">
        </el-table-column>
        <el-table-column prop="address" label="居住地址">
        </el-table-column>
        <el-table-column prop="type_id" label="身份证（正反）" width="190">
          <template slot-scope="scope">
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
        <el-table-column prop="name" label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button @click="deleteBtn(scope.row)" type="text" size="small" icon="el-icon-view">通过</el-button>
            <el-button @click="deleteBtn(scope.row)" type="text" size="small" icon="el-icon-view">拒绝</el-button>
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
import {masterApplyListUrl,ERR_OK} from "@/api/index"
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
      form:{
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
    deleteBtn(row) {

    },
    getList() {
      let that = this;
      var params = {
        pageindex:that.pageIndex,
        callbackcount:that.pageSize,
        id:this.form.id,
        nickName:this.form.nickName,
        phone:this.form.phone
      }
      var url = masterApplyListUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.apply_list;
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