<template>
  <div class="main-back">
    <div class="button-div">
      <van-button type="default" text="新用户注册" to="register" ></van-button>
      <van-button type="default" text="登录" to="login" ></van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoLogin',
    data() {
      return {
        
      }
    },
    mounted(){
      document.title = '爆米花房管家';
    },
    methods: {
    	toRegister() {
         alert("0")
    		this.$router.push({path : '/register'});
    	},
      toLogin() {
        alert("1")
      	this.$router.push({path : '/login'});
      }
    },
  }
</script>

<style scoped>
  .main-back{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/home/login-main.png");
    background-repeat: no-repeat;
    background-size: cover; 
    overflow: auto;
  }
  .button-div{
    position: absolute;
    width: 100%;
    top: 78%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .button-div .van-button{
    margin: 0 0.4rem;
    width: 3.125rem;
    border-radius: 0.3125rem;
    background-color: #FFFFFF;
    color: #959595;
    font-size: 0.4rem;
  }
</style>
