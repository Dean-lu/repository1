<template>
  <div class="main">
    <!-- <van-nav-bar :left-arrow="false" :fixed="true" border title="租房合同确认">
      <van-icon name="cross" slot="right" color="#F8B729" size="0.5rem" @click="toHouseCenter" />
    </van-nav-bar> -->
    <div class="remind">
      <div class="">合同审核中</div>
      <div class="">请前往个人中心查看</div>
    </div>
  </div>
</template>

<script>
//import shareApi from '../../common/until'
  export default {
    name: 'AuditRemind',
    data () {
      return {
        
      }
    },
    mounted(){
      document.title = "租房合同确认";
      this.share();
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      toHouseCenter(){
        this.$router.push({path : '/houseSourceCenter'});
      }
    }
  }
</script>

<style scoped lang="less">
  .van-nav-bar__title{
    color: #F8B729;
  }
  .main{
    width: 100%;
    height: 100%;
  }
  .remind{
    position: relative;
    width: 100%;
    height: 20%;
    background-color: #FFFFFF;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #959595;
    font-size: 0.7rem;
  }
</style>
