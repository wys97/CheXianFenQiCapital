<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">

      <router-link v-if="!item.hidden&&item.noDropdown&&item.children&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <i v-if='item.icon' class="iconfont" :class="item.icon"></i><span>{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <router-link v-if="!item.hidden&&!item.noDropdown&&item.isHome&&item.children&&item.children.length>0" :to="item.path+item.children[0].path">
        <el-menu-item :index="item.path" class='submenu-title-noDropdown' style="background:white;text-align: center;">
          <img src="../../assets/imgs/icon.png" alt="logo" style="width: 26px; height:22px"><span class="logo">{{item.name}}</span>
          <span style='font-size:18px; color:#2FADE2' >中诚信资方管理平台</span>
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-else-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <i v-if='item.icon' class="iconfont" :class="item.icon"></i><span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>

          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <i v-if='child.icon' class="iconfont" :class="child.icon"></i><span>{{child.name}}</span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
import userLogo from '@/assets/logo.png'
export default {
  name: 'SidebarItem',
  data () {
    return {
      userLogo
    }
  },
  props: {
    routes: {
      type: Array
    }
  },
  created () {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .icon-system {
    font-size: 12px;
    margin-right: 10px;
  }
  .logo{
    margin-left: 10px;
  }
</style>

