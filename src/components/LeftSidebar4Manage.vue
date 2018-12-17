<style lang="scss" scoped>
  @import '../common/scss/common.scss';
  @import '../common/scss/mixin.scss';
  $ciclepx:56px;
  $lItemHeight:86px;
  $circleml:($lItemHeight - $ciclepx)/2;
  
  .mSidebar{
    position: fixed;
    left: 0;
    top: $headerTop;
    right: 0;
    bottom: 0;
    background-color: #F2F2F2;
    width: $sidebarWidth;
    float: left;
    border-left:1px solid #F3F2F2 !important;
    .itemTitle{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e8e8e8;
      color: #B6B6B6;
      cursor: pointer;
      .iconStyle{
        margin-left: 12px;
        line-height: 50px;
      }
      .title{
        margin-left: 3px;
      }
      .arrow{
        margin-right: 20px;
        color: #c7c7c7;
      }
    }
    .item{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;
      .title{
        margin-left: 24px;
      }
      &.selected{
        color: $selectedColor;
        background-color: white;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s ease
    }
    .fade-enter, .fade-leave-to{
      opacity: 0;
    }
  }
</style>
<template>
  <ul class="mSidebar">
    <li v-for="(item,index) in mSidebar">
      <div class="itemTitle" @click="flexToggle(index,'click')">
        <i class="fa iconStyle left" :class="item.icon"></i>
        <div class="title left">{{item.title}}</div>
        <!-- <i class="iconfont icon-arrowdowm arrow right"></i> -->
      </div>
      <transition name='fade'>
        <ul v-show="flex[index]">
          <li class="item" v-for="(item,index) in item.subs" :class="[item.id==currentId?'selected':'']" @click="textClick(item)">
            <div class="title left">{{item.text}}</div>
          </li>
        </ul>
      </transition>
    </li>
  </ul> 
</template>

<script>
var menu = [
            {icon:'fa-navicon',title:'表单管理',
              subs:[
                {id:0,text:'用户表',path:'/userList'},
                {id:1,text:'审核表',path:'/auditList'},
                {id:2,text:'订单表',path:'/orderList'},
                {id:3,text:'反馈表',path:'/coupleBackList'},
                {id:4,text:'施工汇报表',path:'/reportList'},
                {id:5,text:'幻灯片列表',path:'/swiperList'}
              ]
            }
           ]

export default {
  data() {
    return {
      currentId: this.$cookie.get('currentId') || 0,
      itemTitleLen: '',
      flex: [],
      isCollapse: false,
      activeIndex: '',
      mSidebar:menu
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  },
  created(){
    this.itemTitleLen = menu.length;//标题的长度
    this.flex=this.initFlex();
    var currentTitleId = this.$cookie.get('currentTitleId')||0;
    var currentId = this.$cookie.get('currentId')||0;
    console.log(currentTitleId + "," + currentId)
    console.log("intoflexToggle")
    if(currentTitleId == 'undefined'){
      currentTitleId = 0;
    }
    this.flexToggle(currentTitleId,"created")
    console.log("outflexToggle")
  },
  mounted() {
  },
  methods: {
    setRouter(currentTitleId,currentId) {
      this.$router.push(menu[currentTitleId].subs[currentId].path); 
    },
    textClick(item) {
      var currentTitleId = this.$cookie.get('currentTitleId')||0;
      this.currentId = item.id;
      this.$cookie.set('currentId',this.currentId);
      var currentId = this.$cookie.get('currentId');
      console.log(currentTitleId + "," + currentId)
      this.setRouter(currentTitleId,currentId);
    },
    flexToggle(index,from) {
      var arr = [];
      if(from=="created"){
        console.log(from,"from");
        this.flex[index] = true;
      }else if(from=="click"){
        // 全部先收缩
        for(var i=0; i<this.itemTitleLen; i++) {
          arr[i]=false;
        }
        // 正常的闭合
        if(this.flex[index] == true) {
          this.flex = arr; 
        }else{
          arr[index]=true;
          this.flex = arr;
          this.$cookie.set('currentTitleId',index);
          this.$cookie.set('currentId',0);
          this.currentId = 0;
        }
      }
      var currentTitleId = this.$cookie.get('currentTitleId');
      var currentId = this.$cookie.get('currentId');
      console.log(currentTitleId + "," + currentId)
      this.setRouter(currentTitleId,currentId);
    },
    initFlex() {
      var arr=[]
      for(var i = 0; i < this.itemTitleLen; i++) {
        if(i==0) {
          arr[i] = true;
        }else{
          arr[i] = false;
        }
      }
      return arr;
    }
  }
}
</script>