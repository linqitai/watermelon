
<style scoped>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.outer{
  position: relative;
  margin:20px auto;
  width: 200px;
  height: 30px;
  line-height: 28px;
  border:1px solid #ccc;
  background: #ccc9c9;
}
.outer span,.filter-box,.inner{
  position: absolute;
  top: 0;
  left: 0;
}
.outer span{
  display: block;
  padding:0  0 0 36px;
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
}
.filter-box{
  width: 0;
  height: 100%;
  background: green;
  z-index: 9;
}
.outer.act span{
  padding:0 36px 0 0;
}
.inner{
  width: 36px;
  height: 28px;
  text-align: center;
  background: #fff;
  cursor: pointer;
  font-family: "宋体";
  z-index: 10;
  font-weight: bold;
  color: #929292;
}
.outer.act .inner{
  color: green;
}
.outer.act span{
  z-index: 99;
}

body {
  font-family: 'Inconsolata', sans-serif;
  background: #2a364f;
}

h1{
  text-align: center;
  color: rgba(255,255,255,0.8);
}

.credit{
  text-align: center;
  color: rgba(255,255,255,0.4);

}

.content{
  padding-top: 45px;
  padding-bottom: 20px;
}

.button_container{
  width: 176px;
  margin: 0 auto;
  margin-top: 30px;
  padding-top: 40px;
}

.button_su{
  overflow: hidden;
  position: relative;
  display: inline-block;
  border-radius: 3px;
  margin-bottom: 30px;
}

.su_button_circle{
  background-color: red;
  border-radius: 1000px;
  position: absolute;
  left:0;
  top:0;
  width: 0px;
  height: 0px;
  margin-left: 0px;
  margin-top: 0px;
  pointer-events: none;
  /*animation-timing-function: ease-in-out; */
}

.button_su_inner{
  display: inline-block;
  background: #F8B627;
  color: #F4F4F4;
  font-size: 16px;
  font-weight: normal;
  width: 132px;
  text-align: center;
  border-radius: 3px;
  transition: 400ms;
  text-decoration: none;
  padding: 22px;
  z-index: 100000;
}

.button_text_container{
 position:relative;
 z-index: 10000;
}

.explode-circle {
 animation: explode 0.5s forwards;

}

.desplode-circle{
 animation: desplode 0.5s forwards;
}

@keyframes explode {
  0% {
    width: 0px;
    height: 0px;
    margin-left: 0px;
    margin-top: 0px;
    background-color: rgba(42, 53, 80,0.2);
  }
  100% {
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    background-color: rgba(20, 180, 87,0.8);
  }
}

@keyframes desplode {
  0% {
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    background-color: rgba(20, 180, 87,0.8);
  }
  100% {
    width: 0px;
    height: 0px;
    margin-left: 0px;
    margin-top: 0px;
    background-color: rgba(129, 80, 108,0.6);
  }
}
.progress{
  height: 7px;
  background: #e3e3e3;
  border-radius: 0;
  box-shadow: none;
  margin: 40px 0 80px;
  overflow: visible;
  position: relative;
  width: 500px;
}
.progress .progress-title{
  padding: 7px 10px;
  margin: 0;
  background: #393a3d;
  border-radius: 5px 0 0 5px;
  box-shadow: 0 7px 7px rgba(0,0,0,0.4);
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  position: absolute;
  top: -13px;
  left: 0;
  z-index: 1;
}
.progress .progress-title:after{
  content: "";
  border-left: 17px solid #393a3d;
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  position: absolute;
  top: 0;
  right: -17px;
}
.progress .progress-bar{
  height: 10px;
  box-shadow: none;
  border-radius: 0;
  position: relative;
  -webkit-animation: animate-positive 2s;
  animation: animate-positive 2s;
}
.progress .progress-bar:after{
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 5px 5px rgba(0,0,0,0.6);
  background: #fff;
  position: absolute;
  right: -5px;
  top: -6px;
}
.progress .progress-value{
  width: 45px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  background: #393a3d;
  box-shadow: 0 5px 5px rgba(0,0,0,0.4);
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  position: absolute;
  bottom: 30px;
  right: -17px;
}
.progress .progress-value:after{
  content: "";
  border-top: 7px solid #393a3d;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  position: absolute;
  bottom: -7px;
  left: 35%;
}
.progress.green .progress-bar:after{ border: 5px solid #21da9a; }
.progress.pink .progress-bar:after{ border: 5px solid #ff1170; }
.progress.blue .progress-bar:after{ border: 5px solid #294bdc; }
.progress.yellow .progress-bar:after{ border: 5px solid #ffa900; }
@-webkit-keyframes animate-positive{
  0% { width: 0; }
}
@keyframes animate-positive{
  0% { width: 0; }
}
</style>
<template>
  <div>
    <canvas id="myCanvas"></canvas>
    <div class="progress green">
      <h3 class="progress-title">HTML5</h3>
      <div class="progress-bar" style="width:65%; background-color:#21da9a;">
        <div class="progress-value">65%</div>
      </div>
    </div>
    <div class="outer">
      <div class="filter-box"></div>
      <span>滑动解锁</span>
      <div class="inner">&gt;&gt;</div>
    </div>
    <div class="button_container">
      <div class="button_su">
        <span class="su_button_circle">
        </span>
        <a href="#" class="button_su_inner">
          <span class="button_text_container">
            Simple button
          </span>
        </a>
      </div>

      <div class="button_su">
        <span class="su_button_circle">
        </span>
        <a href="#" class="button_su_inner">
          <span class="button_text_container">
            Another button
          </span>
        </a>
      </div>

      <div class="button_su">
        <span class="su_button_circle">
        </span>
        <a href="#" class="button_su_inner">
          <span class="button_text_container">
            A third button
          </span>
        </a>
      </div>

      <div class="button_su">
        <span class="su_button_circle">
        </span>
        <a href="#" class="button_su_inner">
          <span class="button_text_container">
            A forth button
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  $(function(){
    setTimeout(function() {
      var c=document.getElementById("myCanvas");
      var cxt=c.getContext("2d");
      cxt.fillStyle="#FF0000";
      cxt.fillRect(0,0,150,75);
    }, 1000)

    $(".inner").mousedown(function(e){
      var el = $(".inner"),os = el.offset(),dx,$span=$(".outer>span"),$filter=$(".filter-box"),_differ=$(".outer").width()-el.width();
      $(document).mousemove(function(e){
        dx = e.pageX - os.left;
        if(dx<0){
          dx=0;
        }else if(dx>_differ){
          dx=_differ;
        }
        $filter.css('width',dx);
        el.css("left",dx);
      });
      $(document).mouseup(function(e){
        $(document).off('mousemove');
        $(document).off('mouseup');
        dx = e.pageX - os.left;
        if(dx<_differ){
          dx=0;
          $span.html("滑动解锁");
        }else if(dx>=_differ){
          dx=_differ;
          $(".outer").addClass("act");
          $span.html("验证通过！");
          el.html('&radic;');
        }
        $filter.css('width',dx);
        el.css("left",dx);
      })
    })
    setTimeout(function() {
      $(".button_su_inner").mouseenter(function(e) {
       var parentOffset = $(this).offset(); 

       var relX = e.pageX - parentOffset.left;
       var relY = e.pageY - parentOffset.top;
       $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
       $(this).prev(".su_button_circle").removeClass("desplode-circle");
       $(this).prev(".su_button_circle").addClass("explode-circle");

     });

      $(".button_su_inner").mouseleave(function(e) {

       var parentOffset = $(this).offset(); 

       var relX = e.pageX - parentOffset.left;
       var relY = e.pageY - parentOffset.top;
       $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
       $(this).prev(".su_button_circle").removeClass("explode-circle");
       $(this).prev(".su_button_circle").addClass("desplode-circle");

     });
    }, 1000)
  })
  export default {
    data() {
      return {
      }
    },
    created() {

    },
    methods: {
    }
  }
</script>