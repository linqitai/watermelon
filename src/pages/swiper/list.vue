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
            {{scope.row.is_show==true?'是':'否'}}
            <el-switch
              v-model="scope.row.is_show"
              active-color="#409EFF"
              inactive-color="#c7c7c7"
              @change="switchEvent(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="report" label="排序">
        </el-table-column>
        <el-table-column prop="created_at" label="添加时间" width="160">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteBtn(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
            <el-button @click="editBtn(scope.row,'edit')" type="text" size="small" icon="el-icon-edit-outline">编辑</el-button>
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
             <!-- <input type="file" @change="inputImgChange($event)" v-show="!form.img_address"/> -->
             <img v-show="form.img_address" :src="form.img_address" width="100">
             <input type="file" @change="inputImgChange($event)"/>
          </div>
        </div>
        <div class="element margT20">
          <div>内容：</div>
          <!-- <button  @click="addMyBlot" icon="el-icon-picture-outline"></button> -->
          <div class="inline" style="height:300px;">
            <!-- <quill-editor style="height:300px !important;"
              v-model="form.contents"
              ref="editor"
              :options="editorOption">
             
            </quill-editor> -->
            <!-- 图片上传组件辅助:headers="header"-->
            <input style="opacity: 0" class="quillInput" type="file" @change="quillInputImgChange($event)"/>
            <el-row v-loading="quillUpdateImg">
              <quill-editor style="height:300px !important;"
                v-model="form.contents"
                ref="myQuillEditor"
                :options="editorOption"
              >
              </quill-editor>
            </el-row>
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
import {quillEditor} from 'vue-quill-editor'
import {swiperListUrl,delSwiperListUrl,addSwiperListUrl,editSwiperUrl,imgUploadUrl,swiperSwitchUrl,p,ajax,ERR_OK} from "@/api/index"
import searchCondition from '@/components/searchCondition.vue'
// import ue from '@/components/ue.vue'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
export default {
  components: {quillEditor},
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
        title:"",
        img_address:"",
        contents:"",
        token:localStorage.getItem('token')
      },
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画
      detailContent: '', // 富文本内容
      // 工具栏配置
      editorOption: {
        placeholder: '',
        theme: 'snow',  // or 'bubble'
        modules: {
            toolbar: {
                container: toolbarOptions,  // 工具栏
                handlers: {
                    'image': function (value) {
                        if (value) {
                            // document.querySelector('#quill-upload input').click()
                            // 触发input框选择图片文件
                            document.querySelector('.quillInput').click()
                            // alert(1)
                        } else {
                            this.quill.format('image', false);
                        }
                    }
                }
            }
        }
      }
    }
  },
  created() {
    console.log(imgUploadUrl,"imgUploadUrl")
    
    this.getList()
  },
  methods: {
    quillInputImgChange(e){
      let that = this;
      var file = e.target.files[0]
      let params = new FormData()
      params.append('file', file)
      params.append('token', localStorage.getItem('token'))
      var url = imgUploadUrl;
      console.log(params,"========params==========")
      var method = 'POST'
      $.ajax({ 
        url : url, 
        type : method, 
        data : params, 
        cache:false,
        // 告诉jQuery不要去处理发送的数据
        processData : false, 
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend: function (XMLHttpRequest) {
          that.quillUpdateImg = true
        },
        complete: function( xhr,data ){
          
        },
        success : function(res) {
          let quill = that.$refs.myQuillEditor.quill
          // 如果上传成功
          if (res.code == ERR_OK) {
              // 获取光标所在位置
              let length = quill.getSelection().index;
              // 插入图片  res.info为服务器返回的图片地址
              quill.insertEmbed(length, 'image', res.data[0].url)
              // 调整光标到最后
              quill.setSelection(length + 1)
          } else {
              that.$message.error('图片插入失败')
          }
          // loading动画消失
          that.quillUpdateImg = false
        },
        error : function(responseStr) { 
          console.log("------error----------")
          that.quillUpdateImg = false
          that.$message.error('图片插入失败')
        } 
      });
    },
    inputImgChange(e) {
      let that = this;
      var file = e.target.files[0]
      let params = new FormData()
      params.append('file', file)
      params.append('token',localStorage.getItem('token'))
      var url = imgUploadUrl;
      console.log(params,"========params==========")
      var method = 'POST'
      // ajax(url,method,params,function(res){
      //   if(res.code===ERR_OK){
      //     console.log("====成功===");
      //     console.log(res.data[0].url,"res.data[0].url")
      //     that.form.imgs = res.data[0].url
      //     that.form.img_address = res.data[0].url
      //   }else{
      //     console.log("失败");
      //     that.$message.error('上传图片失败')
      //   }
      // })
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
        "carouse_id": row.id,
        "is_show": row.is_show==true?1:2, 
        token: localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = swiperSwitchUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          // that.tableData = result.data.report_list;
          that.getList();
          that.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
      })
    },
  	addBtn(operate) {
      this.form.carouse_id = "";
      this.form.title = "";
      this.form.img_address = "";
      this.form.contents = "";
      this.operate = operate;
  		this.dialogFormVisible = true;
  	},
    editBtn(row,operate) {
      console.log(row,"row")
      this.form.carouse_id = row.id;
      this.form.title = row.title;
      this.form.img_address = row.img;
      this.form.contents = row.content;
      this.operate = operate;
      this.dialogFormVisible = true 
    },
    operateSwiperBtn(){
      let that = this;
      var params = this.form;
      var url = this.operate=='add'?addSwiperListUrl:editSwiperUrl;
      console.log(params,"params")
      // Object.assign(params, params, p);
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
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
        "carouse_id": this.id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = delSwiperListUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          // that.tableData = result.data.report_list;
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
      var url = swiperListUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.carouse_list;
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