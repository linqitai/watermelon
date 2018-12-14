<style lang="scss" scoped>
@import '../../common/scss/common.scss';
$height:66px;
$height2:72px;
$tableLeft:100px;
.apply{
  .operateTableBox{
    .functionBox{
      .el-radio+.el-radio{
        margin-left: 16px;
      }
      .el-radio-group{
        vertical-align: unset;
      }
      .el-radio__label{
        margin-left: 4px !important;
      }
    }
    .tableBox{
      clear: both;
      // display: flex;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      color: #646464;
      .tableLeft{
        // flex: 0 0 60px;
        width: $tableLeft;
        border-left:1px solid $tableBorderColor;
        border-right:1px solid $tableBorderColor;
        border-bottom:1px solid $tableBorderColor;
        position: absolute;
        left: 0;
        top: 0;
        background-color: $mainColor;
        color: white;
        label{
          height: 40px;
          line-height: 40px;
          display: block;
          box-sizing: content-box;
        }
        li{
          height: $height2;
          line-height: $height2;
          border-top:1px solid $tableBorderColor;
          display: block;
          box-sizing: border-box;
        }
      }
      .tableWrapper{
        overflow: scroll;
        table.thatTable{
          width: 100%;
          // border: 1px solid $tableBorderColor;
          border-right:none;
          margin-left: $tableLeft;
          background-color: white;
          .header{
            background-color: $mainColor;
            color: white;
          }
          tr{
            white-space:nowrap;
            border-bottom: 1px solid $tableBorderColor;
          }
          tr>th{
            width: 120px;
            height: 40px;
            line-height: 40px;
            border-right:1px solid $tableBorderColor;
            padding: 0 6px; 
          }
          tr{
            td{
              width: 120px;
              height: $height2;
              border-right:1px solid $tableBorderColor;
              overflow: hidden;
              .item{
                width: 120px;
                padding: 0 6px; 
                height: 100%;
                white-space:normal;
               word-break:break-all;
               word-wrap:break-word;
                display: flex;
                flex-direction: column;
                align-content: space-between;
                  flex-wrap:wrap;
                .line1,.line2,.line3{
                  flex: auto;
                }
                .line1{
                  margin-top: 3px;
                }
                .line3{
                  margin-bottom: 3px;
                }
              }
            }
          }
          
        }
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
          <el-breadcrumb-item><span>教师排班明细表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <div class="functionBox">
        <div class="element">
          
          <label class="inline">课程日期：</label>
          <div class="inline">
             <!-- <el-input v-model="name" placeholder="请输入所要查询的姓名"></el-input> -->
              <el-date-picker
                v-model="date"
                type="date"
                size="medium"
                @change="dateChange"
                placeholder="选择日期"
                style="width: 160px;">
              </el-date-picker>
          </div>
          <label class="inline margL20">教师编号：</label>
          <div class="inline">
             <el-input style="width: 160px;"  v-model="serial" placeholder="教师编号" size="medium" @keyup.enter.native="search" clearable></el-input>
          </div>
          <el-radio-group class="margL20" v-model="type" @change="changeType">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="2">外教</el-radio>
            <el-radio :label="1">中教</el-radio>
          </el-radio-group>  
        </div>
      </div>
      <div class="tableBox">
        <ul class="tableLeft">
          <label>教师姓名</label>
          <li v-for="(item,index) in teachers">{{item.teacher}}</li>
        </ul>
        <div class="tableWrapper">
          <table class="thatTable">
            <tr class="header">
              <!-- <th v-for="(item,index) in rooms">{{item.name}}</th> -->
              <th>09:00</th>
              <th>10:00</th>
              <th>11:00</th>
              <th>12:00</th>
              <th>13:00</th>
              <th>14:00</th>
              <th>15:00</th>
              <th>16:00</th>
              <th>17:00</th>
              <th>18:00</th>
              <th>19:00</th>
              <th>20:00</th>
            </tr>
            <tr v-for="(items,index) in teachers">
              <td v-for="(item,index) in items.blocks">
                <div v-show="item.course" class="item">
                  <div class="line1">课程{{item.lesson}}({{item.course}})</div>
                  <div class="line2">地点：{{item.school_id}}{{item.room}}</div>
                  <div class="line3">订课人数：{{item.users_count}}</div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { teachersArrangingsListUrl,ERR_OK } from '@/api/index'
import { getFullDate,getTime } from '@/common/js/utils'

var list = []
export default {
  data() {
    return {
      teachers:[],
      name:"",
      time1Options:[],
      date:"",
      time:"",
      type:"",
      serial:""
    }
  },
  created() {
    // console.log("getSchoole_id：",localStorage.getItem("_school_id")) 
    // this.getTime1Option()
    // this.getList()
  },
  components: {
    // mTime
  },
  methods: {
    changeType() {
      if(!this.date){
        this.$alert('请先选择课程日期', '提示');
        return;
      }
      console.log(this.type)
      this.getList()
    },
    dateChange() {
      this.time = Math.floor(new Date(this.date).getTime()/1000)
      console.log(this.time,"time")
      this.getList()
    },
    search() {
      this.time = Math.floor(new Date(this.date).getTime()/1000)
      console.log(this.time,"time")
      this.getList()
    },
    getList(){
      let that = this;
      var params = {
        time:this.time,
        serial:this.serial,
        type:this.type
      }
      var url = teachersArrangingsListUrl;
      console.log(params,"params")
      this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
          var resultObj = result.data.teacher;
          console.log(resultObj,"resultObj")
          var keys = Object.keys(resultObj)
          console.log(keys,"keys");
          var arr = [];
          for(var i=0;i<keys.length;i++){
            var object = {}
            object.teacher=resultObj[0].en_name 
            var obj = resultObj[keys[i]];
            var blocks = []
            for(var j=0;j<obj.arrangings.length;j++){
              var item = obj.arrangings[j]
              blocks.push(item)
            }
            object.blocks = blocks
            arr.push(object)
          }
          // lists = list
          console.log(arr,"arr")
          that.initList(arr)
          console.log(arr.length,"arr.length")
          for(var i=0;i<list.length;i++){
            for(var j=0;j<arr.length;j++){
              if(list[i].teacher==arr[j].teacher){
                for(var k=0;k<arr[i].blocks.length;k++){
                  for(var t=0;t<list[i].blocks.length;t++){
                    if(arr[i].blocks[k].hour == list[i].blocks[t].hour){
                      list[i].blocks[t] = {
                        hour:arr[i].blocks[k].hour,
                        lesson:arr[i].blocks[k].lesson.serial,
                        course:arr[i].blocks[k].lesson.name,
                        school:arr[i].blocks[k].school_id,
                        room:arr[i].blocks[k].room.name,
                        users_count:arr[i].blocks[k].course.total
                      }
                    }
                  }
                }
              }
            }
          }
          that.teachers = list;
          console.log(that.teachers,"that.teachers")
        }
      });
    },
    initList(arr){
      var that = this;
      list = []
      for ( var i = 0; i < arr.length; i++) { //一维长度为8
        var item = {
          teacher: arr[i].teacher
        }
        var blocks = []
        for ( var j = 0; j < 12; j++) {
          var block = {
            hour: j+9,
            lesson:'',
            course:'',
            school:'',
            room:'',
            users_count:''
          }
          blocks.push(block)
        }
        item.blocks=blocks
        list.push(item)
      }
      console.log(list,"list")
      that.teachers = list
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


