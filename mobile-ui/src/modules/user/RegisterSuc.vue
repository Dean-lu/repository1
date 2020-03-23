<template>
  <div class="register-suc">
    <div class="button-container">
      <van-button type="default" size="large" block round color="#FFB640" text="马上体验" to="home" ></van-button>
      <van-button type="default" size="large" block round color="#FFB640" text="继续完善个人信息"  ></van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RegisterSuc',
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .register-suc{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/user/registersuc-b.png');
    background-repeat: no-repeat;
    background-size: cover; 
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
