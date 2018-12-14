<style lang="scss" scoped>
@import '../../common/scss/common.scss';
.apply{
  .operateTableBox{
    .functionBox{
     
    }
  }
  .dialogBoxOuter{
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 928px;
    height: 560px;
    background-color: white;
    z-index: 1001;
    overflow: hidden;
    // box-shadow:3px 3px 20px 3px rgba(0,0,0,0.5);
    border: 1px solid #D6D6D6;
    border-radius: 10px;
    table.thisTable{
      width: 900px;
      border: 1px solid $tableBorderColor;
      border-right:none;
      background-color: white;
      margin-left: 10px;
      .header{
        background-color: $mainColor;
        color: white;
      }
      tr{
        white-space:nowrap;
        text-align: center;
        border-bottom: 1px solid $tableBorderColor;
        &:nth-child(2),&:nth-child(5),&:nth-child(11){
          background-color: #B1F1FF;
        }
      }
      tr>th,tr>td{
        display: inline-block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-right:1px solid $tableBorderColor;
      }
      th:first-child{
        width: 200px;
      }
      tr>td:first-child{
        width: 200px;
      }
    }
    .functionBox{
      padding: 6px 10px;
    }
    .cardHeader{
      justify-content: space-between;
      border-bottom: 1px solid #c7c7c7;
      overflow: hidden;
      .headerTitle{
        font-size: 15px;
        color: #585858;
        padding: 12px 6px 12px 10px;
      }
      .close{
        font-size: 18px;
        margin-right: 4px;
        margin-top: 4px;
      }
    }
  }
  .el-card__body{
    padding: 0px;
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
          <el-breadcrumb-item><span>教师列表</span></el-breadcrumb-item>
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
      <el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
        <el-table-column
          prop="en_name"
          label="英文名称">
        </el-table-column>
        <el-table-column
          prop="cn_name"
          label="中文名称">
        </el-table-column>
        <el-table-column
          prop="type.name"
          label="教师类型">
        </el-table-column>
        <el-table-column
          prop="role.name"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="name"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="住址">
        </el-table-column>
        <el-table-column
          prop="name"
          label="兼职/专职"
          width="100">
        </el-table-column>
        <el-table-column
          prop="school_id"
          label="所在校区">
        </el-table-column>
      </el-table>
      <!-- <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[4,6,8]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div> -->
    </div>
    <div class="dialogBoxOuter" v-if="dialogBoxVisible">
      <div class="cardHeader">
        <label class="headerTitle left">选择空余时间</label>
        <i class="el-icon-circle-close right close" @click="closeCard"></i>
      </div>
      <div class="functionBox">
        <div class="element">
          <label class="inline">教师名称：</label>
          <div class="inline">
             <el-select class="width140" v-model="teacherValue" size="medium" placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <m-time></m-time> -->
          <m-time @getTimeData="getTimeData"></m-time>
          
          <!-- <label class="inline" v-if="thisDate">{{thisDate}}</label> -->
        </div>
      </div>
      <table class="thisTable">
        <tr class="header">
          <td v-for="(item,index) in days">{{item.name}}</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{item.time}}</td>
          <td v-for="(checkeds,index) in item.checkeds" :data-week="checkeds.week" :data-hour="checkeds.hour">
            <el-checkbox v-model="coordinatesAttr[checkeds.week][checkeds.hour]"></el-checkbox>
          </td>
        </tr>
      </table>
      <div class="functionBox">
        <div class="element">
          <el-button type="primary" size="medium" @click="showThisDay">批量钩选班次</el-button>
          <div class="inline" v-show="isShowDaySelect">
            <label class="inline">日期：</label>
            <el-select class="width100" v-model="thisDay" size="medium" placeholder="请选择" @change="thisDayChange">
              <el-option
                v-for="item in daysOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label class="inline">班次：</label>
            <el-select class="width140" v-model="banci" size="medium" placeholder="请选择" @change="banciChange">
              <el-option
                v-for="item in bancisOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <el-button type="primary" size="medium" @click="lastTeacher">上一位教师</el-button>
          <el-button type="primary" size="medium" @click="nextTeacher">下一位教师</el-button> -->
          <el-button type="primary" size="medium" @click="addBan">加班</el-button>
          <el-button type="primary" class="right" size="medium" @click="saveBtn">保存</el-button>
        </div>
      </div>
    </div>
    <!-- <div class='mask' v-show="maskIsShow" @click="maskHide"></div> -->
  </div>
</template>
<script>
import { teacherListUrl,teacherFreeEditUrl,teacherFreeUrl,ERR_OK } from '@/api/index'
import { getFullDate,getTime } from '@/common/js/utils'
import mTime from '../../components/time.vue'
var coordinatesAttr = new Array(); //先声明一维 
for ( var i = 0; i < 8; i++) { //一维长度为8
    coordinatesAttr[i] = new Array(); //再声明二维 
    for ( var j = 0; j < 21; j++) { //二维长度为21
        coordinatesAttr[i][j] = false; // 赋值，每个数组元素的值为i+j
    }
}
var oneDayTime = 24*60*60*1000
var list2 = [
        {time:'09:00~10:00',checkeds:[{week:'1',hour:'9'},{week:'2',hour:'9'},{week:'3',hour:'9'},{week:'4',hour:'9'},{week:'5',hour:'9'},{week:'6',hour:'9'},{week:'7',hour:'9'}]},
        {time:'10:00~11:00',checkeds:[{week:'1',hour:'10'},{week:'2',hour:'10'},{week:'3',hour:'10'},{week:'4',hour:'10'},{week:'5',hour:'10'},{week:'6',hour:'10'},{week:'7',hour:'10'}]},
        {time:'11:00~12:00',checkeds:[{week:'1',hour:'11'},{week:'2',hour:'11'},{week:'3',hour:'11'},{week:'4',hour:'11'},{week:'5',hour:'11'},{week:'6',hour:'11'},{week:'7',hour:'11'}]},
        {time:'12:00~13:00',checkeds:[{week:'1',hour:'12'},{week:'2',hour:'12'},{week:'3',hour:'12'},{week:'4',hour:'12'},{week:'5',hour:'12'},{week:'6',hour:'12'},{week:'7',hour:'12'}]},
        {time:'13:00~14:00',checkeds:[{week:'1',hour:'13'},{week:'2',hour:'13'},{week:'3',hour:'13'},{week:'4',hour:'13'},{week:'5',hour:'13'},{week:'6',hour:'13'},{week:'7',hour:'13'}]},
        {time:'14:00~15:00',checkeds:[{week:'1',hour:'14'},{week:'2',hour:'14'},{week:'3',hour:'14'},{week:'4',hour:'14'},{week:'5',hour:'14'},{week:'6',hour:'14'},{week:'7',hour:'14'}]},
        {time:'15:00~16:00',checkeds:[{week:'1',hour:'15'},{week:'2',hour:'15'},{week:'3',hour:'15'},{week:'4',hour:'15'},{week:'5',hour:'15'},{week:'6',hour:'15'},{week:'7',hour:'15'}]},
        {time:'16:00~17:00',checkeds:[{week:'1',hour:'16'},{week:'2',hour:'16'},{week:'3',hour:'16'},{week:'4',hour:'16'},{week:'5',hour:'16'},{week:'6',hour:'16'},{week:'7',hour:'16'}]},
        {time:'17:00~18:00',checkeds:[{week:'1',hour:'17'},{week:'2',hour:'17'},{week:'3',hour:'17'},{week:'4',hour:'17'},{week:'5',hour:'17'},{week:'6',hour:'17'},{week:'7',hour:'17'}]},
        {time:'18:00~19:00',checkeds:[{week:'1',hour:'18'},{week:'2',hour:'18'},{week:'3',hour:'18'},{week:'4',hour:'18'},{week:'5',hour:'18'},{week:'6',hour:'18'},{week:'7',hour:'18'}]},
        {time:'19:00~20:00',checkeds:[{week:'1',hour:'19'},{week:'2',hour:'19'},{week:'3',hour:'19'},{week:'4',hour:'19'},{week:'5',hour:'19'},{week:'6',hour:'19'},{week:'7',hour:'19'}]},
        {time:'20:00~21:00',checkeds:[{week:'1',hour:'20'},{week:'2',hour:'20'},{week:'3',hour:'20'},{week:'4',hour:'20'},{week:'5',hour:'20'},{week:'6',hour:'20'},{week:'7',hour:'20'}]}
      ]
export default {
  data() {
    return {
      maskIsShow: false,
      hackReset: false,
      isShowDaySelect: false,
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      showPageTag:true,
      name: '',
      tableData: [],
      dialogVisible: false,
      dialogBoxVisible: false,
      teachers:[],
      teacherValue:'',
      coordinatesAttr:coordinatesAttr,
      weekth:'',
      // thisDate: '',
      thisDay: '',
      coordinates: [],
      teacher_id:'',
      schoole_id: localStorage.getItem("_school_id"),
      daysOption:[{label:'周一',value:1},{label:'周二',value:2},{label:'周三',value:3},{label:'周四',value:4},{label:'周五',value:5},{label:'周六',value:6},{label:'周日',value:7}],
      bancisOption:[{label:'09:00~12:00',value:'9~12'},{label:'12:00~18:00',value:'12~18'},{label:'18:00~21:00',value:'18~21'}],
      banci:'',
      days:[{name:'时间'},{name:'周一'},{name:'周二'},{name:'周三'},{name:'周四'},{name:'周五'},{name:'周六'},{name:'周日'}],
      list:list2
    }
  },
  created() {
    console.log("getSchoole_id：",localStorage.getItem("_school_id"))
    // this.getTime1Option()
    this.getList()
  },
  components: {
    mTime
  },
  methods: {
    maskHide(){
      this.maskIsShow = false
    },
    addBan() {

    },
    lastTeacher() {

    },
    nextTeacher() {

    },
    showThisDay() {
      this.isShowDaySelect = true
    },
    banciChange(value) {
      var day = this.thisDay
      console.log("周几：",this.thisDay)
      console.log("班次：",value)
      var start = parseInt(value.split('~')[0])
      var end = parseInt(value.split('~')[1])
      console.log("start:",start)
      console.log("end:",end)
      for(var i=start;i<end;i++){
        this.coordinatesAttr[day][i] = true
      }
    },
    thisDayChange(value) {
      // console.log("this.thisDate:",this.thisDate)
      // var firstDate = this.$cookie.get("_firstDay")
      // var t = getTime(firstDate)+oneDayTime*(value-1)
      // this.thisDate = getFullDate(t)
      // console.log("date:",getFullDate(t))
    },
    saveBtn() {
      var con = []
      for ( var i = 1; i < 8; i++) { //一维长度为8
        for(var j=9;j<21;j++) {
          if(this.coordinatesAttr[i][j] == true) {
            con.push(`${i},${j}`)
          }
        }
      }
      this.coordinates = con;
      console.log("this.coordinates",this.coordinates)
      this.save();
    },
    save(){
      console.log(this.weekth,"this.weekth")
      let that = this;
      if(this.weekth==""){
        this.$message('请选择排课周期');
        return;
      }
      if(this.coordinates==""){
        this.$message('请选择空余时间');
        return;
      }
      console.log(JSON.stringify(this.coordinates),"--=-=-=-=-=-=-=")
      var params = {
        weekth: this.weekth,
        coordinates: JSON.stringify(this.coordinates),
        teacher_id: this.teacherValue,
        school_id: this.schoole_id
      }
      var url = teacherFreeEditUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          // that.tableData = result.data;
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.dialogBoxVisible = false;
          this.maskIsShow = false;
          that.clearTable();
        }
      });
    },
    clearTable() {
      // this.coordinatesAttr = coordinatesAttr;
      for ( var i = 1; i < 8; i++) { //一维长度为8
        for(var j=9;j<21;j++) {
          if(this.coordinatesAttr[i][j] == true) {
            this.coordinatesAttr[i][j] = false;
          }
        }
      }
    },
    getTimeData() {
      this.weekth = this.$cookie.get("_weekth")
      console.log(this.weekth,"this.weekth")
      this.getTeacherFree()
      // 重置底部数据
      this.isShowDaySelect = false
      this.thisDay = ''
      this.banci = ''
    },
    getTeacherFree(){
      let that = this;
      var params = {
        weekth: this.weekth,
        teacher_id: this.teacherValue,
        school_id: this.schoole_id
      }
      var url = teacherFreeUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          var list = result.data;
          if(list.length==0){
            that.clearTable()
          }else{
            that.clearTable()
            for(var i=0;i<list.length;i++){
              coordinatesAttr[list[i].week][list[i].hour] = true
            } 
            that.coordinatesAttr = coordinatesAttr
          }
          that.list = [];
          that.list = list2;
        }
      });
    },
    closeCard() {
      this.dialogBoxVisible = false;
      this.maskIsShow = false;
      this.clearTable()
    },
    rowClick(row, event, column){
      console.log("row.id:",row.id)
      this.teacher_id = row.id
      this.teacherValue = row.id
      this.dialogBoxVisible = true;
      this.maskIsShow = true;
    },
    getList(){
      let that = this;
      var params = {
        school_id: that.schoole_id
      }
      var url = teacherListUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          that.tableData = result.data.teachers;
          for(var i=0;i<that.tableData.length;i++) {
            that.tableData[i].label = that.tableData[i].cn_name;
            that.tableData[i].value = that.tableData[i].id;
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


