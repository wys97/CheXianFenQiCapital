<template>
  <div class="app-wrapper">
    <!--<sidebar class="sidebar-container"></sidebar>-->
    <Top></Top>
    <div class="main-container">
    	<left-menu></left-menu>
      <!--<navbar></navbar>
      <levelbar></levelbar>-->
      <div style="padding-left: 300px;background-color: #fff;">
      	<app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
  import {  AppMain,LeftMenu,Top } from '../../page/layoutTwo'
  export default {
    name: 'Layout',
    components: {
      AppMain,
      LeftMenu,
      Top
    },
    computed: {
//    sidebar () {
//      return this.$store.state.app.sidebar
//    }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    &.hideSidebar {
      .sidebar-container{
        width:36px;
        overflow: inherit;
      }
      .main-container {
        margin-left: 36px;
      }
    }
    .sidebar-container {
      transition: width 0.28s ease-out;
      width: 180px;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      &::-webkit-scrollbar {display:none}
    }
    .main-container {
      height: 100%;
      transition: margin-left 0.28s ease-out;
      position: relative;
    }
  }
</style>
