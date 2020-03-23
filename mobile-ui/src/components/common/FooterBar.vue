<template>
  <!-- 吸底-->
  <van-tabbar v-model="active" @change="changeTab" active-color="#F8B729" inactive-color="#474747" >
    <!-- <van-tabbar-item :key="index" v-for="(item,index) in tabList" :icon="icons[index]">{{item.tabName}}</van-tabbar-item> -->
    <!-- <van-icon class-prefix="my-icon" name="liebiao" /> -->
    <!-- <van-icon class-prefix="my-icon" name="myfill" /> -->
    <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item icon="manager">我的</van-tabbar-item>
    <!-- <van-tabbar-item>
      <van-icon class-prefix="my-icon" name="myfill" />
      <div>我的</div>
    </van-tabbar-item> -->
  </van-tabbar>
</template>

<script>
  export default {
    name: 'FooterBar',
    data () {
      return {
        active: 0,
        /* 固定底部tab*/
        tabList: [
          {
            tabName: '首页',
            icon: 'wap-home',
            toModule: '/home'
          },
          {
            tabName: '我的',
            icon: 'manager',
            toModule: '/mine'
          }
        ]
      }
    },
    mounted(){
      this.refreshActive();
    },
    methods:{
      // 全局吸底显示控制
      refreshActive(){
        this.active = this.$router.currentRoute.meta.footerActive ? this.$router.currentRoute.meta.footerActive : 0;
      },
      changeTab(index) {
        // debugger
        this.active = index;
        this.$router.push({path : this.tabList[index].toModule}).catch(err => {err});
      }
    }
  }
</script>

<style>
  .van-tabbar{
    background-color: #F5F5F5;
  }
</style>
