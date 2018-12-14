<style lang="scss" scoped>
@import '../../common/scss/common.scss';
$height:40px;
.apply{
  .operateTableBox{
    .tableBox{
      clear: both;
      // display: flex;
      text-align: center;
      position: relative;
      .tableLeft{
        // flex: 0 0 60px;
        width: 60px;
        border-left:1px solid $tableBorderColor;
        border-right:1px solid $tableBorderColor;
        border-bottom:1px solid $tableBorderColor;
        position: absolute;
        left: 0;
        top: 0;
        background-color: $mainColor;
        color: white;
        li{
          height: $height;
          line-height: $height;
          border-top:1px solid $tableBorderColor;
          display: block;
        }
      }
      .tableWrapper{
        overflow: scroll;
        table.thatTable{
          width: 100%;
          border: 1px solid $tableBorderColor;
          border-right:none;
          margin-left: 60px;
          background-color: white;
          .header{
            background-color: $mainColor;
            color: white;
          }
          tr{
            white-space:nowrap;
            border-bottom: 1px solid $tableBorderColor;
            &:nth-child(2),&:nth-child(5),&:nth-child(10){
              background-color: #B1F1FF;
            }
          }
          tr>th{
            width: 150px;
            height: $height;
            line-height: $height;
            border-right:1px solid $tableBorderColor;
            box-sizing: content-box;
            padding: 0 6px; 
          }
          tr>td{
            width: 150px;
            height: $height;
            border-right:1px solid $tableBorderColor;
            box-sizing: content-box;
            padding: 0 6px; 
          }
        }
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
          <el-breadcrumb-item><span>课程安排</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <div class="element">
          <label class="inline">排课周期：</label>
          <div class="inline">
             <el-select class="width140" size="medium" v-model="time1" @change="time1Change" placeholder="请选择">
              <el-option
                v-for="item in time1Options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="inline">
             <el-select class="width200" size="medium" v-model="time2" @change="time2Change" placeholder="请选择">
              <el-option
                v-for="item in time2Options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <div class="inline">
            <el-button type="primary" size="">查询</el-button>
          </div> -->
        </div>
        <div style="margin-top: 10px;">
          <el-button type="primary" size="medium" @click="preparePublish">预发布课程</el-button>
          <el-button type="primary" size="medium">发布课程</el-button>
          <el-button type="primary" size="medium">上周未定课程统计</el-button>
        </div>
        <div style="margin-top: 18px;">
          <el-radio-group v-model="week" @change="changeweek">
            <el-radio :label="1">周一</el-radio>
            <el-radio :label="2">周二</el-radio>
            <el-radio :label="3">周三</el-radio>
            <el-radio :label="4">周四</el-radio>
            <el-radio :label="5">周五</el-radio>
            <el-radio :label="6">周六</el-radio>
            <el-radio :label="7">周日</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="tableBox">
        <ul class="tableLeft">
          <li></li>
          <li>09:00</li>
          <li>10:00</li>
          <li>11:00</li>
          <li>12:00</li>
          <li>13:00</li>
          <li>14:00</li>
          <li>15:00</li>
          <li>16:00</li>
          <li>17:00</li>
          <li>18:00</li>
          <li>19:00</li>
          <li>20:00</li>
        </ul>
        <div class="tableWrapper">
          <table class="thatTable">
            <tr class="header">
              <th v-for="(item,index) in rooms">{{item.name}}</th>
            </tr>
            <tr v-for="(items,index) in list">
              <td v-for="(item,index) in items.blocks" @click="openDialogModel(item.room_id,item.hour)">
                <div v-if="item.courseSerial">
                  <div class="margint">{{item.courseSerial}}.{{item.lessonSerial}}</div>
                  <div class="">{{item.lessonName}}.{{item.teacherName}}</div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <el-dialog title="排课" :visible.sync="isShowPaikeDialog" :modal="false" width="40%">
      <div class="lineBox">
        <b class="icon">*</b>
        <b class="text">教师</b>
        <el-select class="inputTitle" v-model="teacherValue" placeholder="请选择教师" @change="getTeacherCourseEvent">
          <el-option
            v-for="item in teachersOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="lineBox">
        <b class="icon">*</b>
        <b class="text">课程</b>
        <el-select class="inputTitle" v-model="courseValue" placeholder="请选择课程" @change="courseChange">
          <el-option
            v-for="item in coursesOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowPaikeDialog = false">取 消</el-button>
        <el-button type="primary" @click="editClass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { classListUrl,teacherFreeUrl,getRoomsUrl,teacherListUrl,getTeacherCourseUrl,getCourseListUrl,editClassUrl,ERR_OK } from '@/api/index'
import { getFullDate,getTime,getDay,getDaysInYearMonth,getMonth } from '@/common/js/utils'
// 一天有多少毫秒
var oneDayTime = 24*60*60*1000
var oneDaySecond = 24*60*60
var list = []
export default {
  data() {
    return {
      schoole_id: localStorage.getItem("_school_id"),
      weekth:'',
      courseValue: '',
      teacherValue: '',
      isShowPaikeDialog:false,
      week:1,
      time1Options:[],
      time2Options:[],
      time1:"",
      time2:"",
      teachersOption:[],
      coursesOption:[],
      rooms:[],
      list:[],
      hour:'',
      room_id:'',
      lession_id:'',
      course_id:''
    }
  },
  created() {
    this.getTime1Option();
    this.getRooms();
  },
  methods: {
    courseChange(e) {
      this.course_id = e.split(',')[0]
      this.lession_id = e.split(',')[1]
      console.log(this.courseValue,"courseValue")
      console.log(this.lession_id,"lession_id")
    },
    getRooms() {
      var that = this;
      var params = {
        school_id: that.schoole_id
      }
      var url = getRoomsUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          // that.tableData = result.data.category;
          that.rooms = result.data.rooms;
          console.log(that.rooms,"that.rooms")
          that.initList();
          console.log(that.list,"that.list")
        }
      })
    },

    getTeacherCourseEvent() {
      var that = this;
      that.getCourseList()
    },
    getCourseList() {
      var that = this;
      var params = {
        school_id: that.schoole_id,
        teacher_id: that.teacherValue,
      }
      var url = getTeacherCourseUrl;
      console.log(params,"=========params============")
      that.$axios.post(url,params).then((res)=>{
        console.log(res,"resresresres")
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          that.coursesOption = result.data.course;
          for(var i=0;i<that.coursesOption.length;i++){
            var serial = that.coursesOption[i].serial
            for(var j=0;j<that.coursesOption[i].lessons.length;j++){
              that.coursesOption[i].value = that.coursesOption[i].id+','+that.coursesOption[i].lessons[j].id
              that.coursesOption[i].label = serial + '.' + that.coursesOption[i].lessons[j].serial + '-' + that.coursesOption[i].lessons[j].name
              // that.coursesOption[i].lession_id = that.coursesOption[i].lessons[j].id
            }
          }
          console.log(that.coursesOption,"that.coursesOption")
        }
      });
    },
    getTeacherList() {
      var that = this;
      var params = {
        school_id: that.schoole_id
      }
      var url = teacherListUrl;
      console.log(params,"params")
      that.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          // that.tableData = result.data.category;
          console.log(result.data.teachers,"result.data.teachers;")
          that.teachersOption = result.data.teachers;
          for(var i=0;i<that.teachersOption.length;i++){
            console.log(that.teachersOption[i].id,"that.teachersOption[i].id")
            that.teachersOption[i].value = that.teachersOption[i].id
            that.teachersOption[i].label = that.teachersOption[i].en_name
          }
        }
      });
    },
    openDialogModel(room_id,hour) {
      var that = this;
      that.room_id = room_id;
      that.hour = hour;
      console.log(that.hour,"that.hour")
      if(that.weekth==""){
        that.$alert('请先选择排课周期', '提示');
        return;
      }
      if(that.teachersOption.length>0){

      }else{
        that.teachersOption = []
        that.coursesOption = []
        that.getTeacherList()
      }
      that.isShowPaikeDialog = true
    },
    editClass(){
      var that = this;
      console.log(that.weekth.split(',')[0],"begin")
      console.log(that.week,"week")
      var params = {
        time:parseInt(that.weekth.split(',')[0]) + oneDaySecond*(that.week-1) + that.hour*60*60,// 当前选择方块的时间戳，比如：2018年 9月 24号 1点的课程
        room_id:that.room_id,
        lesson_id: that.lession_id,
        course_id: that.course_id,
        school_id: that.schoole_id,
        teacher_id: that.teacherValue,
      }
      var url = editClassUrl;
      console.log(params,"=========params============")

      that.$axios.post(url,params).then((res)=>{
        console.log(res,"resresresres")
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          console.log("success")
          that.getList();
          that.isShowPaikeDialog = false
        }else if(result.status_code == 433) {
          that.$alert(result.message, '提示');
        }
      });
    },
    initList(){
      var that = this;
      list = []
      for ( var i = 0; i < 12; i++) { //一维长度为8
        var item = {
          hour: i+9
        }
        var blocks = []
        for ( var j = 0; j < that.rooms.length; j++) {
          var block = {
            room_id: that.rooms[j].id,
            roomName: that.rooms[j].name,
            course:'',
            teacher:'',
            courseSerial:'',
            lessonSerial:'',
            lessonName:'',
            teacherName:'',
            hour:i+9
          }
          blocks.push(block)
        }
        item.blocks=blocks
        list.push(item)
      }
      that.list = list
    },
    getList() {
      var that = this;
      var params = {
        weekth: that.weekth,
        week:that.week,
        is_released: 0,
      }
      var url = classListUrl;
      console.log(params,"params")
      that.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result,'--result--')
        if(result.status_code == ERR_OK){
          // that.tableData = result.data.category;
          var arranging = result.data.arranging;
          console.log(arranging,"arranging");
          console.log(Object.keys(arranging),"keys");
          var keys = Object.keys(arranging);
          var arr = [];
          for(var i=0;i<keys.length;i++){
            console.log(arranging[keys[i]],"arranging")
            var obj = arranging[keys[i]];
            for(var j=0;j<obj.length;j++){
              var item = {
                week:obj[j].week,
                hour:obj[j].hour,
                courseSerial:obj[j].lesson.course.serial,
                lessonSerial:obj[j].lesson.serial,
                lessonName:obj[j].lesson.name,
                teacherName:obj[j].teacher.en_name,
                roomName:obj[j].room.name
              }
              arr.push(item)
            }
          }
          that.initList();
          for(var i=0;i<arr.length;i++){
            console.log(arr,"arr")
            console.log(arr[i],"arr[i]")
            console.log(arr[i].hour,"arr[i].hour")
            for(var j=0;j<list.length;j++){
              if(list[j].hour==arr[i].hour){
                for(var k=0;k<list[j].blocks.length;k++){
                  if(list[j].blocks[k].roomName==arr[i].roomName){
                    list[j].blocks[k].courseSerial = arr[i].courseSerial;
                    list[j].blocks[k].lessonSerial = arr[i].lessonSerial;
                    list[j].blocks[k].lessonName = arr[i].lessonName;
                    list[j].blocks[k].teacherName = arr[i].teacherName;
                  }
                }
              }
            }
          }
          that.list = list;
          console.log(arr,"arr")
        }
      });
    },
    preparePublish() {
      var that = this;
      // if(that.time2){
      //   that.isShowPaikeDialog = true;
      // }else{
      //   that.$message("请选择排课周期")
      // }
    },
    time1Change(value) {
      var that = this;
      console.log(value,"value") // value: 2018/11
      var month = value.split('/')[1]
      console.log("月份：" + month)
      var firstDay = value.toString() + "/1"
      var arr = []
      var time  = getTime(firstDay)//获取时间戳
      var days = getDaysInYearMonth(value.split('/')[0],month)
      console.log(days,"天数")
      for(var i=0;i<days;i++){
        var d = getDay(time)
        if(d==1){
          var lastRange = getFullDate(time)
          var m = getMonth(lastRange)
          console.log("month:" + month + ",m:" + m)
          if(month == m) {
            var range = getFullDate(time)+"~"+getFullDate(time+oneDayTime*6)
            var item = {label:range,value:range}
            arr.push(item)
          }
        }
        time = time + oneDayTime
      }
      that.time2Options = arr
    },
    time2Change(value) {
      var that = this;
      console.log(value,"value")
      var time1 = getTime(value.split('~')[0]).toString()
      var len1 = time1.length
      var time2 = getTime(value.split('~')[1]).toString()
      var len2 = time2.length
      var timebegin = time1.substring(0,len1-3);
      var timeend = parseInt(time2.substring(0,len2-3))+oneDaySecond;
      var w = []
      w.push(timebegin)
      w.push(timeend)
      that.weekth = w.join(',') //"1542946667,1543030763";
      console.log(that.weekth,"weekth")
      that.week = 1
      that.getList()
    },
    getTime1Option() {
      var that = this;
      var datatime = new Date()
      var year = datatime.getFullYear();
      var month = datatime.getMonth()-1
      var arr = []
      for(var i=month;i<12;i++){
        var item = {label:`${year}/${i+1}`,value: `${year}/${i+1}`}
        arr.push(item)
      }
      var year2 = parseInt(year) + 1
      for(var i=0;i<12;i++){
        var item = {label:`${year2}/${i+1}`,value: `${year2}/${i+1}`}
        arr.push(item)
      }
      // console.log(arr,"arr")
      that.time1Options = arr
    },
    changeweek(){
      var that = this;
      console.log(that.week,"week")
      if(that.weekth==""){
        that.$alert('请先选择排课周期', '提示');
      }else{
        that.getList()
      }
    }
  }
}
</script>


