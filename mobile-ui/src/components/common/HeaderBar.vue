<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    :fixed="true"
    color="#FFB640"
    @click-left="onClickLeft"
  />
</template>

<script>
  export default {
    name: 'HeaderBar',
    data () {
      return {
        title: '',
      }
    },
    mounted(){
      this.refresh();
    },
    methods:{
      refresh(){
        this.title = this.$router.currentRoute.meta.title;
      },
      onClickLeft() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped>
  /* .van-nav-bar{
    height: 1rem;
    line-height: 1rem;
  } */
  .van-nav-bar__text{
    color: #FFB640;
  }
  .van-nav-bar__title{
    color: #FFB640;
  }
  .van-nav-bar .van-icon{
    color: #FFB640!important;
  }
</style>
