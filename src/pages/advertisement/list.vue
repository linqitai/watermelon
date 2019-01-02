<style lang="scss" scoped>
.apply{
  .operateTableBox{

  }
  .editor{
    height: 300px;
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
          <el-breadcrumb-item><span>广告管理</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <el-button @click="operateBtn(null,'add')" type="primary" size="medium" icon="el-icon-plus">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%;margin-top: 10px;">
        <el-table-column prop="id" label="编号">
        </el-table-column>
        <el-table-column prop="title" label="广告名称">
        </el-table-column>
        <el-table-column prop="img" label="轮播图（单张）" width="210">
          <template slot-scope="scope">
            <img :src="scope.row.img_address" width="180" :preview="scope.row.id" preview-text="">
          </template>
        </el-table-column>
        <el-table-column prop="is_show" label="是否使用">
          <template slot-scope="scope">
            {{scope.row.is_show==true?'是':'否'}}
            <el-switch
              v-model="scope.row.is_show"
              active-color="#409EFF"
              inactive-color="#c7c7c7"
              @change="switchEvent(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="添加时间" width="160">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteBtn(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
            <el-button @click="operateBtn(scope.row,'edit')" type="text" size="small" icon="el-icon-edit-outline">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[4,6,8]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增幻灯片" :visible.sync="dialogFormVisible" :append-to-body="true" :fullscreen="false" width="500">
      <div class="dialogBody">
        <div class="element">
          <label class="inline width100">广告名称：</label>
          <div class="inline">
             <el-input v-model="form.title" size="medium" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="element margT20">
          <label class="inline width100">appid：</label>
          <div class="inline">
             <el-input v-model="form.appid" size="medium" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="element margT20">
          <label class="inline width100">跳转路径：</label>
          <div class="inline">
             <el-input v-model="form.url" size="medium" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="element margT20">
          <label class="inline width100">上传封面：</label>
          <div class="inline">
             <!-- <input type="file" @change="inputImgChange($event)" v-show="!form.img_address"/> -->
             <img v-show="form.img_address" :src="form.img_address" width="100">
             <input type="file" @change="inputImgChange($event)"/>
          </div>
        </div>
        
      </div>
      <div style="margin-top:20px;text-align: right;">
        <el-button class="" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="margL12" type="primary" @click="operateAdvertisement">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { ERR_OK } from '@/api/index'
// import { getFullDate } from '@/common/js/utils'
// import { quillEditor } from 'vue-quill-editor' //调用编辑器
import {quillEditor} from 'vue-quill-editor'
import {miniListUrl,miniDelUrl,miniAddUrl,miniEditUrl,imgUploadUrl,miniSwitchUrl,p,ajax,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
// import ue from '@/components/ue.vue'

export default {
  components: {quillEditor},
  data() {
    return {
      pageIndex: 1,
      pageSize: 4,
      total: 100,
      showPageTag:false,
      dialogVisible: false,
      tableData: [],
      id:"",
      dialogFormVisible: false,
      editorOption:{},
      operate:'',
      form: {
        mini_id:"",
        appid:"",
        url:"",
        title:"",
        img_address:"",
        token:localStorage.getItem('token')
      },
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画
      detailContent: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    inputImgChange(e) {
      let that = this;
      var file = e.target.files[0]
      let params = new FormData()
      params.append('file', file)
      params.append('token',localStorage.getItem('token'))
      var url = imgUploadUrl;
      console.log(params,"========params==========")
      var method = 'POST'
      const loading = that.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      $.ajax({ 
        url : url, 
        type : 'POST', 
        data : params, 
        cache:false,
        // 告诉jQuery不要去处理发送的数据
        processData : false, 
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend: function (XMLHttpRequest) {
          
        },
        complete: function( xhr,data ){
          loading.close();
        },
        success : function(res) { 
          if(res.code===ERR_OK){
            console.log("====成功===");
            console.log(res.data[0].url,"res.data[0].url")
            that.form.img_address = res.data[0].url
            // that.form.img_url = res.data[0].url;
            // that.isShowImgUrl = true;
            // console.log(that.form.img_url)
          }else{
            console.log("失败");
          }
        },
        error : function(responseStr) { 
          console.log("------error----------")
          loading.close();
        } 
      });
    },
    switchEvent(row) {
      let that = this;
      console.log(row.is_show,"row.is_show")
      var params = {
        mini_id: row.id,
        is_show: row.is_show==true?1:2, 
        token: localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = miniSwitchUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
      })
    },
    operateBtn(row,operate) {
      if(operate == 'add') {
        this.form.mini_id = '';
        this.form.title = '';
        this.form.url = '';
        this.form.img_address = '';
        this.form.appid = '';
      }else{
        this.form.mini_id = row.id;
        this.form.title = row.title;
        this.form.url = row.url;
        this.form.img_address = row.img_address;
        this.form.appid = row.appid;
      }
      this.operate = operate;
      this.dialogFormVisible = true 
    },
    operateAdvertisement(){
      let that = this;
      var params = this.form;
      var url = this.operate=='add'?miniAddUrl:miniEditUrl;
      console.log(params,"params")
      // Object.assign(params, params, p);
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            type: 'success',
            message: '操作成功!'
          });
          that.dialogFormVisible = false;
        }
      });
    },
    deleteBtn(row) {
      var that = this;
      that.$confirm(`此操作将删除该数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.delete(row);
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    delete(row) {
      let that = this;
      var params = {
        mini_id: row.id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = miniDelUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
      })
    },
    getList() {
      let that = this;
      var params = {
        pageindex:that.pageIndex,
        callbackcount:that.pageSize,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = miniListUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.mini_list;
          console.log(that.tableData,"that.tableData")
          for(var i=0;i<that.tableData.length;i++){
            if(that.tableData[i].is_show==1){
              that.tableData[i].is_show = true
            }
            if(that.tableData[i].is_show==2){
              that.tableData[i].is_show = false
            }
          }
          that.total = result.data.count;
          if(that.total<that.pageSize) {
            that.showPageTag = false;
          }else{
            that.showPageTag = true;
          }
        }
      })
      // this.$axios.post(url,params).then((res)=>{
      //   var result = res.data;
      //   console.log(result.code,'--res.status_code--')
      //   if(result.code == ERR_OK){
      //     that.tableData = result.data.carouse_list;
      //     that.total = result.data.count;
      //     if(that.total<that.pageSize) {
      //       that.showPageTag = false;
      //     }else{
      //       that.showPageTag = true;
      //     }
      //   }
      // });
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