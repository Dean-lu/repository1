<template>
  <div class="register-suc">
    <div class="button-container">
      <van-button type="default" size="large" block round color="#FFB640" text="马上体验" to="home" ></van-button>
      <van-button type="default" size="large" block round color="#FFB640" text="继续完善个人信息" to="myInfo" ></van-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'RegisterSuc',
    data () {
      return {
        
      }
    },
    mounted(){
      this.share()
    },
    methods:{
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
    }
  }

</script>

<style scoped>
  .register-suc{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/user/registersuc-b.png');
    background-repeat: no-repeat;
    background-size: 100% 100%; 
  }
  .button-container{
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5.5rem;
    height: 4rem;
    margin: 0 auto;
  }
  .button-container .van-button{
    margin-bottom: 1rem;
  }
</style>
