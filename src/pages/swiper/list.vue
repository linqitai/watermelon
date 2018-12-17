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
          <el-breadcrumb-item><span>幻灯片管理</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <el-button @click="addBtn('add')" type="primary" size="medium" icon="el-icon-plus">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%;margin-top: 10px;">
        <el-table-column prop="id" label="编号">
        </el-table-column>
        <el-table-column prop="title" label="活动名称">
        </el-table-column>
        <el-table-column prop="img" label="轮播图（单张）" width="210">
          <template slot-scope="scope">
            <img :src="scope.row.img" width="180" :preview="scope.row.id" preview-text="">
          </template>
        </el-table-column>
        <el-table-column prop="is_show" label="是否使用">
          <template slot-scope="scope">
            {{scope.row.is_show==1?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="report" label="排序">
        </el-table-column>
        <el-table-column prop="created_at" label="添加时间" width="160">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteBtn(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
            <el-button @click="editBtn(scope.row.id,'edit')" type="text" size="small" icon="el-icon-edit-outline">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[4,6,8]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增幻灯片" :visible.sync="dialogFormVisible" :append-to-body="true" :fullscreen="true">
      <div class="dialogBody">
        <div class="element">
          <label class="inline">活动名称：</label>
          <div class="inline">
             <el-input v-model="form.title" size="medium" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="element margT20">
          <label class="inline">上传封面：</label>
          <div class="inline">
             <input type="file" @change="inputImgChange($event)"/>
          </div>
        </div>
        <div class="element margT20">
          <div>内容：</div>
          <!-- <button  @click="addMyBlot" icon="el-icon-picture-outline"></button> -->
          <div class="inline" style="height:300px; margin-top:10px;">
            <quill-editor style="height:300px !important;"
              v-model="form.contents"
              ref="editor"
              :options="editorOption">
             
            </quill-editor>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;">
        <el-button class="" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="margL12" type="primary" @click="operateSwiperBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { ERR_OK } from '@/api/index'
// import { getFullDate } from '@/common/js/utils'
// import { quillEditor } from 'vue-quill-editor' //调用编辑器
import {quillRedefine} from 'vue-quill-editor-upload'
import {quillEditor} from 'vue-quill-editor'
import {swiperListUrl,delSwiperListUrl,addSwiperListUrl,editSwiperUrl,imgUploadUrl,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
// import ue from '@/components/ue.vue'

export default {
  components: {quillEditor, quillRedefine},
  data() {
    return {
      pageIndex: 1,
      pageSize: 4,
      total: 100,
      showPageTag:true,
      dialogVisible: false,
      tableData: [],
      id:"",
      dialogFormVisible: false,
      editorOption:{},
      operate:'',
      form: {
        carouse_id:"",
        title:"好商品",
        img_address:"http://xywl-1256946438.cos.ap-chengdu.myqcloud.com/storage%2Fapp%2Fimages%2F20181215%2Fcea48db6588fe218ce3cb86bd6a8f899.jpg",
        contents:"低价大促销",
        imgs:"http://xywl-1256946438.cos.ap-chengdu.myqcloud.com/storage%2Fapp%2Fimages%2F20181215%2Fcea48db6588fe218ce3cb86bd6a8f899.jpg"
      }
    }
  },
  created() {
    console.log(imgUploadUrl,"imgUploadUrl")
    // this.editorOption = quillRedefine(
    //     {
    //       // 图片上传的设置
    //       uplpadConfig: {
    //         action: imgUploadUrl,  // 必填参数 图片上传地址
    //         // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
    //         // 你必须把返回的数据中所包含的图片地址 return 回去
    //         res: (response) => {
    //           console.log(response.data[0].url,"response.data[0].url")
    //           return response.data[0].url  // 这里切记要return回你的图片地址
    //         },
    //         methods: 'POST',  // 可选参数 图片上传方式  默认为post
    //         // token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    //         name: 'img',  // 可选参数 文件的参数名 默认为img
    //         // size: 500,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
    //         accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
    //         // input点击事件  formData是提交的表单实体
    //         change: (formData) => {
    //           console.log(formData,"formData")
    //         },
    //         // 设置请求头 xhr: 异步请求， formData: 表单对象
    //         header: (xhr, formData) => {
    //             // xhr.setRequestHeader('myHeader','myValue');
    //             // formData.append('file', '1234')
    //         },
    //       }
    //     }
    //   )
    this.getList()
  },
  methods: {
    addMyBlot() {
      const quill = this.$refs['editor'].quill;
      // quill.insertEmbed(index, 'myblot', 'balabala。。。');
    },
    inputImgChange(e) {
      let that = this;
      var file = e.target.files[0]
      let params = new FormData()
      params.append('file', file)
      var url = imgUploadUrl;
      console.log(params,"========params==========")
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
          // XMLHttpRequest.setRequestHeader("authorization", localStorage.getItem('authorization'));
          // that.progressDialog = true;
        },
        complete: function( xhr,data ){
          
        },
        success : function(res) { 
          if(res.code===ERR_OK){
            console.log("====成功===");
            console.log(res.data[0].url,"res.data[0].url")
            that.form.imgs = res.data[0].url
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
        } 
      });
    },
  	addBtn(operate) {
      this.operate = operate;
  		this.dialogFormVisible = true;
  	},
    editBtn(id,operate) {
      this.form.carouse_id = id;
      this.operate = operate;
      this.dialogFormVisible = true 
    },
    operateSwiperBtn(){
      let that = this;
      var params = this.form;
      var url = this.operate=='add'?addSwiperListUrl:editSwiperUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          // that.tableData = result.data.report_list;
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
      this.id = row.id
      that.$confirm(`此操作将删除该数据, 是否继续?`, '提示', {
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
        "carouse_id": this.id
      }
      var url = delSwiperListUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
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
      }
      var url = swiperListUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.carouse_list;
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