<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
@import './common/scss/common';
#app{
  min-width: 1250px;
}
</style>
