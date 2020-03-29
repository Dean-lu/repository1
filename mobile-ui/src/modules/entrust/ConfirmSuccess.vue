<template>
  <div class="main">
    <van-nav-bar :left-arrow="false" :fixed="true" border title="委托合同签约">
      <van-icon name="cross" slot="right" color="#F8B729" size="0.5rem" @click="toHome" />
    </van-nav-bar>
    <div class="remind">
      <div class="title">
        <van-col span="10">
          logo
        </van-col>
        <van-col span="14">
          <div >签约成功</div>
        </van-col>
      </div>
      <div class="division"></div>
      <div class="msg">恭喜您！您的房源已上架推广，同时会有工作人员联系您实地查勘。</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConfirmSuccess',
    data () {
      return {
        
      }
    },
    mounted(){
    },
    methods: {
      toHome(){
        this.$router.push({path : '/home'});
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
    width: 80%;
    height: 20%;
    text-align: left;
    background-color: #FFFFFF;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #959595;
    font-size: 0.4rem;
  }
  .title{
    font-size: 0.8rem;
    line-height: 1rem;
  }
  .division{
    width: 100%;
    height: 3.25rem;
  }
  .msg{
    
  }
</style>
