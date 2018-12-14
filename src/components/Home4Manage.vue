<template>
  <div class="home">
    <v-head></v-head>
    <div class="contentWrapper">
      <l-sidebar></l-sidebar>
      <div class="content" ref="content">
          <!-- <keep-alive>
            <router-view></router-view>
          </keep-alive> -->
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import lSidebar from './LeftSidebar4Manage.vue'
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  components: {
    vHead, lSidebar
  }
}
</script>
<style lang="scss">
@import '../common/scss/common.scss';
.home {
  position: relative;
  font-size: 13px;
  background-color: gray;
  // min-width: 1200px;
  @include extend();
  .contentWrapper{
    overflow-y: scroll;
    .content{
      overflow-y: scroll;
      position: fixed;
      left: $sidebarWidth;
      top: $headerTop;
      right: 0;
      bottom: 0;
      background-color: white;
      float: left;
      min-width: 1100px;
      
    }
  }
}
</style>
