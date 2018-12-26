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
          <el-breadcrumb-item><span>订单表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <search-condition @clickSearchData="getList">
        <div class="element">
          <p class="inline">状态：</p>
          <div class="inline">
            <el-select class="width140" size="medium" v-model="status" @change="statusChange" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="element">
          <p class="inline">订单号：</p>
          <div class="inline width160">
             <el-input v-model="form.order_no" size="medium" placeholder="请输入搜索内容" clearable></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline margL20">订单发起人：</p>
          <div class="inline width160">
             <el-input v-model="form.user_nickName" size="medium" placeholder="请输入搜索内容" clearable></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">预约时间：</p>
          <div class="inline">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              @change="changeDate"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </search-condition>
      <!-- <el-breadcrumb separator-class="iconfont icon-line">
          <el-breadcrumb-item><span class="nocurrent">全部</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="nocurrent">待接单</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="nocurrent">进行中</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="nocurrent">结束</span></el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="订单编号">
        </el-table-column>
        <el-table-column prop="master_id" label="师傅ID">
        </el-table-column>
        <el-table-column prop="user_nickName" label="订单发起人" width="160">
           <template slot-scope="scope">
              <label class="width160 ellipsis">{{scope.row.user_nickName}}</label>
              <!-- <el-tooltip class="width140 ellipsis" effect="dark" :content="scope.row.user_nickName" placement="right">
                 <el-button type="text" size="small">{{scope.row.user_nickName}}</el-button>
              </el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column prop="master_nickName" label="接单人" width="120">
        </el-table-column>
        <el-table-column prop="appointment_time" label="预约时间" width="160">
          <template slot-scope="scope">{{ scope.row.appointment_time | getDate}}</template>
        </el-table-column>
        <el-table-column prop="created_at" label="发起时间" width="160">
        </el-table-column>
        <el-table-column prop="total" label="需求概况" width="100">
        </el-table-column>
        <el-table-column prop="gz" label="设计工种" width="180">
          <template slot-scope="scope">
            <!-- {{scope.row.user.nickName}} -->
            <el-tooltip class="width140 ellipsis" effect="dark" :content="scope.row.gz" placement="right">
               <el-button type="text" size="small">{{scope.row.gz}}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="is_done" label="状态" fixed="right">
          <template slot-scope="scope">{{ scope.row.is_done | status}}</template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.is_done == 0">
              <el-button @click="postWorkerBtn(scope.row)" type="text" size="small" icon="el-icon-location-outline">指派工人</el-button>
              <el-button @click="setRubbishBtn(scope.row)" type="text" size="small" icon="el-icon-delete">设为垃圾信息</el-button>
            </div>
            
            <div v-if="scope.row.is_done == 2">
              <el-button @click="cancelTaskBtn(scope.row)" type="text" size="small" icon="el-icon-location-outline">代双方取消订单</el-button>
            </div>

            <div v-if="scope.row.is_done == 1">
              <el-button @click="taskCommentBtn(scope.row)" type="text" size="small" icon="el-icon-location-outline">查看双方评价</el-button>
            </div>
            <!-- <el-button @click="waitOrderBtn(scope.row)" type="text" size="small" icon="el-icon-view">待接单操作</el-button>
            <el-button @click="ingBtn(scope.row)" type="text" size="small" icon="el-icon-edit-outline">进行中</el-button>
            <el-button @click="endBtn(scope.row)" type="text" size="small" icon="el-icon-edit-outline">结束</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[4,6,8]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="双方评价" :visible.sync="lookCommentVisible" :append-to-body="true" :fullscreen="false" width="400px">
      <div class="dialogBody">
        <div class="element">
          <label class="inline">任务发起者：{{user_comment}}</label>
        </div>
        <div class="element">
          <label class="inline">接单师傅：{{master_comment}}</label>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lookCommentVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="指派工人" :visible.sync="dialogFormVisible" :append-to-body="true" :fullscreen="false" width="400px">
      <div class="dialogBody">
        <div class="element">
          <label class="inline">师傅ID：</label>
          <div class="inline">
             <el-input v-model="master_id" size="medium" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMaster">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { ERR_OK } from '@/api/index'
// import { getFullDate } from '@/common/js/utils'
import {taskListUrl,sendMasterUrl,cancelTaskUrl,taskCommentUrl,setRubbishUrl,ajax,ERR_OK} from "@/api/index"
import { getFullDate } from '@/common/js/utils'
import searchCondition from '@/components/searchCondition.vue'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 8,
      total: 100,
      showPageTag:true,
      name: '',
      dateRange:"",
      status:'',
      statusOptions:[{value:'',label:'全部'},{value:'0',label:'待接单'},{value:'2',label:'进行中'},{value:'1',label:'完成'}],
      tableData: [],
      master_id: '',
      task_id: '',
      user_id: '',
      user_comment:"",
      master_comment:"",
      dialogFormVisible: false,
      lookCommentVisible: false,
      form: {
        order_no:"",
        user_nickName:"",
        begin_time:'',
        end_time:'',
        is_done:'',
        user_id:''
      }
    }
  },
  created() {
    console.log(this.$route.query.user_id,"this.$route.params.user_id")
    this.form.user_id = this.$route.query.user_id
    this.getList()
  },
  filters: {
    getDate(t) {
      return getFullDate(t);
    },
    status(t) {
      //任务状态:1完成 2进行中0还未开始
      return t==1?"完成":t==2?"进行中":t==0?"待接单":"";
    }
  },
  components: {
    searchCondition
  },
  methods: {
    changeDate(value){
      console.log(value,"-------value-----------")
      var data1 = new Date(value[0]).getTime().toString();
      var len1 = data1.length
      var time1 = data1.substring(0,len1-3);
      var data2 = new Date(value[1]).getTime().toString();
      var len2 = data2.length
      var time2 = data2.substring(0,len2-3);
      console.log(`time1:${time1},time2:${time2}`);
      this.form.begin_time = time1;
      this.form.end_time = time2;
      // var times = [];
      // times.push(time1);
      // times.push(time2);
      // this.time = times;
      // console.log(this.time,"this.time")
    },
    taskCommentBtn(row) {
      console.log(row.id,"row.id")
      this.lookCommentVisible = true
      let that = this;
      var params = {
        "task_id":row.id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = taskCommentUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result,"result")
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.user_comment=result.data.user_comment||'未评价'
          that.master_comment=result.data.master_comment||'未评价'
        }
      });
    },
  	search(){
  		
  	},
    cancelTaskBtn(row){
      var that = this;
      this.task_id = row.id;
      this.$confirm(`此操作将代双方取消订单, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.cancelTask();
      }).catch(() => {
        that.$message({
          showClose: true,
          message: '已取消',
          type: 'success'
        });
      });
    },
    cancelTask(){
      let that = this;
      var params = {
        "task_id":that.task_id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = cancelTaskUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result,"result")
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          });
        }
      });
    },
    // 指派工人
    postWorkerBtn(row) {
      this.task_id = row.id;
      this.dialogFormVisible = true;
    },
    sendMaster(){
      let that = this;
      var params = {
        "master_id":that.master_id,
        "task_id":that.task_id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = sendMasterUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result,"result")
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            showClose: true,
            message: '指派成功',
            type: 'success'
          });
          that.dialogFormVisible = false;        
          that.master_id = "";
        }
      });
    },
    setRubbishBtn(row) {
      var that = this;
      this.$confirm(`此操作将此数据设置成垃圾信息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.setRubbishEvent(row);
      }).catch(() => {
        that.$message({
          showClose: true,
          message: '已取消',
          type: 'success'
        });
      });
    },
    setRubbishEvent(row) {
      // setRubbishUrl
      let that = this;
      var params = {
        "task_id":row.id,
        "user_id":row.user_id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = setRubbishUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result,"result")
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.getList();
          that.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          });
        }
      });
    },
    waitOrderBtn(row) {

    },
    ingBtn(row) {

    },
    endBtn(){

    },
    statusChange(value){
      console.log(value)
      this.form.is_done = value
      this.getList()
    },
    getList() {
      console.log(this.dateRange,"this.daterange")
      if(!this.dateRange){
        this.form.begin_time = '';
        this.form.end_time = '';
      }
      let that = this;
      var params = {
        pageindex:that.pageIndex,
        callbackcount:that.pageSize,
        order_no:that.form.order_no,
        user_nickName:that.form.user_nickName,
        begin_time:that.form.begin_time,
        end_time:that.form.end_time,
        is_done:that.form.is_done,
        user_id:that.form.user_id,
        token:localStorage.getItem('token')
      }
      // Object.assign(params, params, p);
      var url = taskListUrl;
      console.log(params,"params")
      var method = 'POST'
      ajax(url,method,params,function(res){
        var result = res;
        console.log(result,"result")
        console.log(result.code,'--res.status_code--')
        if(result.code == ERR_OK){
          that.tableData = result.data.task_list;
          for(var i=0;i<that.tableData.length;i++){
            var arr = []
            for(var j=0;j<that.tableData[i].task_category.length;j++){
              arr.push(that.tableData[i].task_category[j].name)
            }
            that.tableData[i].gz = arr.join('、')
          }
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